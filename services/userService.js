const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ENCODE_KEY || "test", {
    expiresIn: "30m",
  });
};

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

const validatePassword = async (inputPassword, userPassword) => {
  return bcrypt.compare(inputPassword, userPassword);
};

const findUserByEmail = async (email) => {
  return userModel.findOne({ email }).lean();
};

const createUser = async (userData) => {
  return userModel.create(userData);
};

module.exports = {
  generateToken,
  hashPassword,
  validatePassword,
  findUserByEmail,
  createUser,
};
