'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

module.exports = mongoose.model('User', UserSchema);

