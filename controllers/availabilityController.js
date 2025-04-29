import { Availability } from "../models/Availability.js";

export const setAvailability = async (req, res) => {
  const { professorId, availability } = req.body;

  const result = await Availability.insertMany(
    availability.map(slot => ({
      professor: professorId,
      date: slot.date,
      start_time: slot.start_time,
      end_time: slot.end_time,
    }))
  );
  
  res.status(201).json(result);
};

export const getAvailableSlots = async (req, res) => {
  const { professorId, date } = req.query;
  const slots = await Availability.find({ professor: professorId, date });
  res.json(slots);
};
