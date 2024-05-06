const statusModel = require("../models/statusModel");

const findAllstatus = async () => {
  return statusModel.find().lean();
};

module.exports = {
  findAllstatus
};
