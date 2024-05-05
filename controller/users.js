const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ENCODE_KEY, {
    expiresIn: "30m",
  });
};

const sendResponse = (res, status, message, data = null, token = null) => {
  res
    .status(status)
    .json({
      status: status === 200 ? "success" : "error",
      message,
      data,
      token,
    });
};

const authenticate = async (req, res, next) => {
  const { email , password } = req.body ?? {};
  console.log(req.body);
  if (!email || !password) {
    return sendResponse(res, 400, "Invalid Credentials");
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return sendResponse(res, 400, "Invalid Credentials");
    }

    const token = generateToken(user._id);
    return sendResponse(res, 200, "Authentication Successful", user, token);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticate,
};
