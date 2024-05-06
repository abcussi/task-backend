const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
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

const findNameById = async (id) => {
  return userModel.findOne({ id }).lean();
};

const findAllUsers = async () => {
  return userModel.find({}, 'name email').lean();
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
  findAllUsers,
  findNameById
};
