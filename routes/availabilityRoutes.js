import express from "express";
import { setAvailability, getAvailableSlots } from "../controllers/availabilityController.js";

const router = express.Router();

router.get("/", getAvailableSlots);
router.post("/", setAvailability);

export default router;
