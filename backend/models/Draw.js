import mongoose from "mongoose";

const drawSchema = new mongoose.Schema({
  numbers: [Number],
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Draw", drawSchema);