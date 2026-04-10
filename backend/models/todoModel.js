import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);

export default Todo;
