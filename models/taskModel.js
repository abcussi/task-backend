const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TaskSchema = new Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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
