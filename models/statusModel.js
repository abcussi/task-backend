const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatusSchema = new Schema(
  {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    collection: "Status",
  }
);

module.exports = mongoose.model("Status", StatusSchema);
