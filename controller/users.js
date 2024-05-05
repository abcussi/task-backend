const userService = require("../services/userService");

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

const handleError = (res, error) => {
  console.error(error);
  return res.status(500).json({ status: "error", message: "Internal Server Error" });
};

const authenticate = async (req, res, next) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return sendResponse(res, 400, "Email and password are required.");
  }

  try {
    const user = await userService.findUserByEmail(email);
    const isPasswordValid =
      user && await userService.validatePassword(password, user.password);

    if (!isPasswordValid) {
      return sendResponse(res, 400, "Invalid email or password.");
    }

    const token = userService.generateToken(user._id);
    return sendResponse(res, 200, "Authentication Successful", token);
  } catch (error) {
    return handleError(res, error);
  }
};

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return sendResponse(res, 400, "All fields are required.");
  }

  try {
    const userExists = await userService.findUserByEmail(email);
    if (userExists) {
      return sendResponse(res, 400, "User with Email already exists");
    }

    const hashedPassword = await userService.hashPassword(password);
    const newUser = await userService.createUser({
      name,
      email,
      password: hashedPassword,
    });

    const token = userService.generateToken(newUser._id);
    return sendResponse(res, 200, "User added successfully", token);
  } catch (error) {
    return handleError(res, error);
  }
};

module.exports = {
  authenticate,
  signup,
};
