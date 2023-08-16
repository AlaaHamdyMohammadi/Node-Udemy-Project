const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, "Username is required!"] },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
    lowercase: true,
    validator: [validator.isEmail, 'Please write a valid email'],
  },
  password: { type: String, required: [true, "Please provide a password!"], minlength: 5 },
  passwordConfirm: { type: String, required: [true, "Please confirm your password!"] },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
