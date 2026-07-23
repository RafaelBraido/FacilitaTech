/**
 * Tutorial.js (model)
 * --------------------
 * Hoje só guarda "Title" e "Description" (em inglês, maiúsculo — nomes
 * confirmados a partir do TutorialServices.js real). Sem campo de
 * conteúdo/passo a passo ainda.
 */
import mongoose from "mongoose";

const TutorialSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
      trim: true,
    },
    Description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    collection: "tutorials",
    timestamps: true,
  }
);

export default mongoose.model("Tutorial", TutorialSchema);