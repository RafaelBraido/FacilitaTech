/**
 * User.js (model)
 * ----------------
 * Sem e-mail informado pelo usuário: o campo "email" ainda existe (é
 * obrigatório/único no banco) mas é preenchido automaticamente pelo
 * AuthServices.js com um valor interno gerado — a pessoa nunca digita
 * isso.
 *
 * "nome" agora é único também ("unique: true" abaixo), porque virou o
 * identificador usado para login (sem e-mail, precisa ser único, senão
 * o login pode entrar na conta errada).
 *
 * ⚠️ Se o banco já tiver usuários com nomes repetidos, criar esse
 * índice único vai falhar (ou o MongoDB vai reclamar) até que os
 * duplicados sejam resolvidos manualmente primeiro.
 */
import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      unique: true,
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
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export default mongoose.model("User", UsersSchema);