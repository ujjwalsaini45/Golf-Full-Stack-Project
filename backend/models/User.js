import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  subscription: {
    type: String,
    enum: ["monthly", "yearly"],
    default: null
  },
  charity: String,
  role: {
    type: String,
    default: "user"
  }
});

export default mongoose.model("User", userSchema);