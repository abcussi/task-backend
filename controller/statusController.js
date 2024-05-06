const findAllstatus = require("../services/statusService");

const getStatus = async (req, res, next) => {
  try {
    const tasks = await findAllstatus.findAllstatus();
    if (!tasks.length) {
      return res
        .status(404)
        .json({ status: "error", message: "No status found" });
    }
    return res.json({ status: "success", message: "Status found", data: tasks });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  getStatus,
};
