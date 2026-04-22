import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);

  if (!user) return res.status(400).send("Invalid");

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token });
});

export default router;