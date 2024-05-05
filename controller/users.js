const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Helper function to generate a JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ENCODE_KEY || "test", {
    expiresIn: "30m",
  });
};

// Helper function to send HTTP response with optional token
const sendResponse = (res, status, message, token = null) => {
  if (status === 200 && token) {
    res.cookie("x-access-token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 60 * 1000, // 30 min
    });
  }

  res.status(status).json({
    status: status === 200 ? "success" : "error",
    message,
  });
};

// Authenticate user by email and password
const authenticate = async (req, res, next) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return sendResponse(res, 400, "Email and password are required.");
  }

  try {
    const user = await userModel.findOne({ email }).lean();
    const isPasswordValid =
      user && (await bcrypt.compare(password, user.password));
    if (!isPasswordValid) {
      return sendResponse(res, 400, "Invalid email or password.");
    }

    const token = generateToken(user._id);
    return sendResponse(res, 200, "Authentication Successful", token);
  } catch (error) {
    next(error);
  }
};

// Create a new user and return the created user's token
const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return sendResponse(res, 400, "All fields are required.");
    }

    const userExists = await userModel.findOne({ email }).lean();
    if (userExists) {
      return sendResponse(res, 400, "User with Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);
    return sendResponse(res, 200, "User added successfully", token);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticate,
  createUser,
};
