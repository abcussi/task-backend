const mongoose = require("mongoose");
const User = require("../models/userModel");
const Task = require("../models/taskModel");
const Status = require("../models/statusModel");
const { hashPassword } = require("../services/userService");

const seed = async () => {
  try {
        // Delete all existing documents in each collection
        await Status.deleteMany({});
        await User.deleteMany({});
        await Task.deleteMany({});
    
    const statuses = await Status.insertMany([
        { status: "Todo" },
        { status: "Incomplete" },
        { status: "Completed" },
      ]);
      const hashedPassword = await hashPassword("password");
      const users = await User.insertMany([
        { name: "john Doe", password: hashedPassword, email: "test@test.com" },
        { name: "jane Doe", password: hashedPassword, email: "test2@test.com" },
      ]);
    
      const tasks = await Task.insertMany([
        {
          userId: users[0]._id,
          title: "Task 1",
          description: "Task description 1",
          status: statuses[0]._id,
          refUserId: users[1]._id,
        },
        {
          userId: users[1]._id,
          title: "Task 2",
          description: "Task description 2",
          status: statuses[1]._id,
          refUserId: users[0]._id,
        },
      ]);
      console.log("Seed completed successfully");
  } catch (error) {
    console.error(error);
  }
}

module.exports = seed;
