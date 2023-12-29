const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    assigned: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    description: {
      type: String,
      required: true,
      max: 500,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task };
