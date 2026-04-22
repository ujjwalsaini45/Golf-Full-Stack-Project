import express from "express";
import Score from "../models/Score.js";

const router = express.Router();

// Add score (only 5 allowed)
router.post("/", async (req, res) => {
  const { userId, score, date } = req.body;

  const existing = await Score.find({ userId }).sort({ date: 1 });

  if (existing.length >= 5) {
    await Score.deleteOne({ _id: existing[0]._id });
  }

  const newScore = await Score.create({ userId, score, date });
  res.json(newScore);
});

export default router;