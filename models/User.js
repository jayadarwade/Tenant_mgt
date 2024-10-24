const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // isDeleted: {
  //   type: Boolean,
  //   default: false,
  // },
  // createdDate: {
  //   type: Date,
  //   default: Date.now,
  // },
  // updatedDate: {
  //   type: Date,
  //   default: Date.now,
  // },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
