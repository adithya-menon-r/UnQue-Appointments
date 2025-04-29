import express from "express";
import { bookAppointment, cancelAppointment, getStudentAppointments } from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/", bookAppointment);
router.delete("/:appointmentId", cancelAppointment);
router.get("/student/:studentId", getStudentAppointments);

export default router;
