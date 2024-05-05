const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TaskSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to User model
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Status', // Reference to Status model
      required: true,
    },
    refUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to User model
    },
  },
  {
    collection: "Task",
  }
);

module.exports = mongoose.model("Task", TaskSchema);
