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
  let studentA1, studentA2, professorP1;
  let availabilitySlots = [];
  let appointmentA1, appointmentA2;

  it("Student A1 authenticates to access the system", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "a1@gmail.com", name: "A1", role: "student" });

    expect(res.statusCode).toBe(200);
    studentA1 = res.body;
  });

  it("Professor P1 authenticates to access the system", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "p1@gmail.com", name: "P1", role: "professor" });

    expect(res.statusCode).toBe(200);
    professorP1 = res.body;
  });

  it("Professor P1 specifies which time slots he is free for appointments", async () => {
    const res = await request(app)
      .post("/api/availability")
      .send({
        professorId: professorP1._id,
        availability: [
          { date: "2025-04-28", start_time: "08:00", end_time: "09:00" },
          { date: "2025-04-28", start_time: "10:00", end_time: "11:00" },
        ]
      });

    expect(res.statusCode).toBe(201);
    availabilitySlots = res.body;
    expect(availabilitySlots.length).toBe(2);
  });

  it("Student A1 views available time slots for Professor P1", async () => {
    const res = await request(app)
      .get("/api/availability")
      .query({ professorId: professorP1._id, date: "2025-04-28" });

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("Student A1 books an appointment with Professor P1 for time T1", async () => {
    const res = await request(app)
      .post("/api/appointments")
      .send({
        studentId: studentA1._id,
        professorId: professorP1._id,
        date: "2025-04-28",
        start_time: "08:00",
        end_time: "09:00"
      });

    expect(res.statusCode).toBe(201);
    appointmentA1 = res.body;
    expect(appointmentA1.student).toBe(studentA1._id);
  });

  it("Student A2 authenticates to access the system", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "a2@gmail.com", name: "A2", role: "student" });

    expect(res.statusCode).toBe(200);
    studentA2 = res.body;
  });

  it("Student A2 books an appointment with Professor P1 for time T2", async () => {
    const res = await request(app)
      .post("/api/appointments")
      .send({
        studentId: studentA2._id,
        professorId: professorP1._id,
        date: "2025-04-28",
        start_time: "10:00",
        end_time: "11:00"
      });

    expect(res.statusCode).toBe(201);
    appointmentA2 = res.body;
    expect(appointmentA2.student).toBe(studentA2._id);
  });

  it("Professor P1 cancels the appointment with Student A1", async () => {
    const res = await request(app)
      .delete(`/api/appointments/${appointmentA1._id}`);

    expect(res.statusCode).toBe(200);
  });

  it("Student A1 checks their appointments and sees no pending appointments", async () => {
    const res = await request(app)
      .get(`/api/appointments/student/${studentA1._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(0);
  });
});
