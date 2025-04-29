import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  professor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
