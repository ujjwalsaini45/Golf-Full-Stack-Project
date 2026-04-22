import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  matchCount: Number,
  prize: Number,
  status: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending"
  }
});

export default mongoose.model("Winner", winnerSchema);