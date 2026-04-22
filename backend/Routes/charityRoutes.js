import express from "express";
import Charity from "../models/Charity.js";

const router = express.Router();

// GET ALL
router.get("/", async (req, res) => {
  const data = await Charity.find();
  res.json(data);
});

// ADD
router.post("/", async (req, res) => {
  const charity = await Charity.create(req.body);
  res.json(charity);
});

export default router;