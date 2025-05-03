import app from "../app.js";
import request from "supertest";
import mongoose from "mongoose";

import { connectDB } from "../config/db.js";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Appointment Booking User Flow", () => {
  let studentA1 = {}, studentA2 = {}, professorP1 = {};
  let availabilitySlots = [];
  let appointmentA1, appointmentA2;

  it("Student A1 authenticates to access the system", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({ email: "a1@gmail.com", name: "A1", password: "a1-1234", role: "student" });

    expect(res.statusCode).toBe(201);
    const { user, token } = res.body;
    expect(user).toHaveProperty("id");
    expect(token).toBeDefined();
    studentA1 = { ...user, token };
  });

  it("Professor P1 authenticates to access the system", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({ email: "p1@gmail.com", name: "P1", password: "p1-1234", role: "professor" });

    expect(res.statusCode).toBe(201);
    const { user, token } = res.body;
    expect(user).toHaveProperty("id");
    expect(token).toBeDefined();
    professorP1 = { ...user, token };
  });

  it("Professor P1 specifies which time slots he is free for appointments", async () => {
    const res = await request(app)
      .post("/api/availability")
      .set("Authorization", `Bearer ${professorP1.token}`)
      .send({
        availability: [
          { date: "2025-04-28", start_time: "08:00", end_time: "09:00" },
          { date: "2025-04-28", start_time: "10:00", end_time: "11:00" },
        ],
      });

    expect(res.statusCode).toBe(201);
    availabilitySlots = res.body;
    expect(availabilitySlots.length).toBe(2);
  });

  it("Student A1 views available time slots for Professor P1", async () => {
    const res = await request(app)
      .get("/api/availability")
      .set("Authorization", `Bearer ${studentA1.token}`)
      .query({ professorId: professorP1.id, date: "2025-04-28" });

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it("Student A1 books an appointment with Professor P1 for time T1", async () => {
    const res = await request(app)
      .post("/api/appointments")
      .set("Authorization", `Bearer ${studentA1.token}`)
      .send({
        professorId: professorP1.id,
        date: "2025-04-28",
        start_time: "08:00",
        end_time: "09:00"
      });

    expect(res.statusCode).toBe(201);
    appointmentA1 = res.body;
    expect(appointmentA1.student).toBe(studentA1.id);
  });

  it("Student A2 authenticates to access the system", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({ email: "a2@gmail.com", name: "A2", password: "a2-1234", role: "student" });

    expect(res.statusCode).toBe(201);
    const { user, token } = res.body;
    studentA2 = { ...user, token };
  });

  it("Student A2 books an appointment with Professor P1 for time T2", async () => {
    const res = await request(app)
      .post("/api/appointments")
      .set("Authorization", `Bearer ${studentA2.token}`)
      .send({
        professorId: professorP1.id,
        date: "2025-04-28",
        start_time: "10:00",
        end_time: "11:00"
      });

    expect(res.statusCode).toBe(201);
    appointmentA2 = res.body;
    expect(appointmentA2.student).toBe(studentA2.id);
  });

  it("Professor P1 cancels the appointment with Student A1", async () => {
    const res = await request(app)
      .delete(`/api/appointments/${appointmentA1._id}`)
      .set("Authorization", `Bearer ${professorP1.token}`);

    expect(res.statusCode).toBe(200);
  });

  it("Student A1 checks their appointments and sees no pending appointments", async () => {
    const res = await request(app)
      .get(`/api/appointments/student/${studentA1.id}`)
      .set("Authorization", `Bearer ${studentA1.token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(0);
  });
});
