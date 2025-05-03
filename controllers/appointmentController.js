import { Appointment } from "../models/Appointment.js";
import { Availability } from "../models/Availability.js";

export const bookAppointment = async (req, res) => {
  const studentId = req.user.id;
  const { professorId, date, start_time, end_time } = req.body;

  const slotExists = await Availability.findOne({
    professor: professorId,
    date,
    start_time,
    end_time,
  });

  if (!slotExists) {
    return res.status(400).json({ message: "This slot isn't available" });
  }

  const existingAppointment = await Appointment.findOne({
    professor: professorId,
    date,
    start_time,
  });

  if (existingAppointment) {
    return res.status(400).json({ message: "Time slot already booked" });
  }

  const appointment = await Appointment.create({
    professor: professorId,
    student: studentId,
    date,
    start_time,
    end_time,
  });

  res.status(201).json(appointment);
};

export const cancelAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  const userId = req.user.id;
  const isStudent = appointment.student.toString() === userId;
  const isProfessor = appointment.professor.toString() === userId;
  if (!isStudent && !isProfessor) {
    return res.status(403).json({ message: "Forbidden: You are not authorized to cancel this appointment" });
  }
  
  await Appointment.findByIdAndDelete(appointmentId);
  res.json({ message: "Appointment canceled" });
};

export const getStudentAppointments = async (req, res) => {
  const { studentId } = req.params;
  if (req.user.role === "student" && req.user.id !== studentId) {
    return res.status(403).json({ message: "Forbidden: You are not authorized to view these appointments" });
  }
  const appointments = await Appointment.find({ student: studentId });
  res.json(appointments);
};
