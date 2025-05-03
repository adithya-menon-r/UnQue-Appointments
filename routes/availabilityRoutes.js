import express from "express";
import { setAvailability, getAvailableSlots } from "../controllers/availabilityController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authenticate);

router.get("/", authorize("student", "professor"), getAvailableSlots);
router.post("/", authorize("professor"), setAvailability);

export default router;
