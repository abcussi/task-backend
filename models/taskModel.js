const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TaskSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
    },
    refUserId: {
      type: String,
    },
  },
  {
    collection: "Task",
  }
);

module.exports = mongoose.model("Task", TaskSchema);
