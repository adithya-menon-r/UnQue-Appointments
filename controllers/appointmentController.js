import { Appointment } from "../models/Appointment.js";

export const bookAppointment = async (req, res) => {
  const { professorId, studentId, date, start_time, end_time } = req.body;

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
  await Appointment.findByIdAndDelete(appointmentId);
  res.json({ message: "Appointment canceled" });
};

export const getStudentAppointments = async (req, res) => {
  const { studentId } = req.params;
  const appointments = await Appointment.find({ student: studentId });
  res.json(appointments);
};
