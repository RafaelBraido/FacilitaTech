
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