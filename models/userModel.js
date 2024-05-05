'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Schema = mongoose.Schema;
const UserSchema = new Schema({
 name: {
  type: String,
  trim: true,  
  required: true,
 },
 email: {
  type: String,
  trim: true,
  required: true
 },
 password: {
  type: String,
  trim: true,
  required: true
 }
},
{
    collection: 'User'
});

let model = mongoose.model('User', UserSchema);

model.getAllUsers = function (done) {
    this.find({}, done).lean();
};
    
module.exports = model;

