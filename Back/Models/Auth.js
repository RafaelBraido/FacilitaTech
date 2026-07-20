/**
 * Auth.js (model)
 * ---------------
 * ⚠️ Este model não parece ser usado por nenhum arquivo do projeto —
 * o AuthServices.js usa "Models/User.js", não este. Mantido sem
 * alterações; confirme se ainda é necessário antes de apagar.
 */
import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    collection: "auth",
    timestamps: true,
  }
);

export default mongoose.model("Auth", AuthSchema);