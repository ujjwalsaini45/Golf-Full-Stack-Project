import express from "express";
import User from "../models/User.js";
import Score from "../models/Score.js";
import Charity from "../models/Charity.js";
import Draw from "../models/Draw.js";
import Winner from "../models/Winner.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();


// 🔐 ADMIN CHECK MIDDLEWARE
const adminOnly = async (req, res, next) => {
  const user = await User.findById(req.user);

  if (!user || user.role !== "admin") {
    return res.status(403).json({ msg: "Admin access only" });
  }

  next();
};



// =======================
// 👤 USER MANAGEMENT
// =======================

// GET ALL USERS
router.get("/users", auth, adminOnly, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// DELETE USER
router.delete("/users/:id", auth, adminOnly, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  await Score.deleteMany({ userId: req.params.id });

  res.json({ msg: "User deleted" });
});



// =======================
// 🎯 DRAW MANAGEMENT
// =======================

// RUN DRAW (ADMIN CONTROL)
router.post("/draw/run", auth, adminOnly, async (req, res) => {
  const numbers = [];
  while (numbers.length < 5) {
    let n = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(n)) numbers.push(n);
  }

  const draw = await Draw.create({ numbers });

  const users = await Score.distinct("userId");

  for (let user of users) {
    const scores = await Score.find({ userId: user });

    let matchCount = scores.filter(s =>
      numbers.includes(s.score)
    ).length;

    if (matchCount >= 3) {
      await Winner.create({
        userId: user,
        matchCount,
        prize:
          matchCount === 5
            ? 1000
            : matchCount === 4
            ? 500
            : 200
      });
    }
  }

  res.json({ msg: "Draw executed", numbers });
});



// =======================
// 🏆 WINNER MANAGEMENT
// =======================

// GET ALL WINNERS
router.get("/winners", auth, adminOnly, async (req, res) => {
  const winners = await Winner.find().populate("userId", "name email");
  res.json(winners);
});

// MARK AS PAID
router.put("/winners/:id/pay", auth, adminOnly, async (req, res) => {
  const winner = await Winner.findByIdAndUpdate(
    req.params.id,
    { status: "paid" },
    { new: true }
  );

  res.json(winner);
});



// =======================
// ❤️ CHARITY MANAGEMENT
// =======================

// ADD CHARITY
router.post("/charity", auth, adminOnly, async (req, res) => {
  const charity = await Charity.create(req.body);
  res.json(charity);
});

// DELETE CHARITY
router.delete("/charity/:id", auth, adminOnly, async (req, res) => {
  await Charity.findByIdAndDelete(req.params.id);
  res.json({ msg: "Charity removed" });
});



// =======================
// 📊 ANALYTICS
// =======================

// DASHBOARD STATS
router.get("/stats", auth, adminOnly, async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalWinners = await Winner.countDocuments();
  const totalCharities = await Charity.countDocuments();

  res.json({
    totalUsers,
    totalWinners,
    totalCharities
  });
});

export default router;