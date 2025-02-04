import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for this task."],
      maxlength: [60, "Title cannot be more than 60 characters"],
    },
    description: {
      type: String,
      required: false,
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    dueDate: {
      type: Date,
      required: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
