import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log("DB Error:", err));

import authRoutes from "./Routes/authRoutes.js";
import scoreRoutes from "./Routes/scoreRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/scores", scoreRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));