import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toLocaleString()} | ${req.method} ${req.url}`);
  next(); 
});

app.use("/api/auth", authRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/appointments", appointmentRoutes);

export default app;
