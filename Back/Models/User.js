import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum:["user","admin"]
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export default mongoose.model("User", UsersSchema);
 