import express from "express";
import { bookAppointment, cancelAppointment, getStudentAppointments } from "../controllers/appointmentController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authenticate);

router.post("/", authorize("student"), bookAppointment);
router.delete("/:appointmentId", authorize("student", "professor"), cancelAppointment);
router.get("/student/:studentId", authorize("student", "professor"), getStudentAppointments);

export default router;
