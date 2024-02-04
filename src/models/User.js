const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "The email field is required"],
    trim: true, // will remove leading and trailing blanks
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});
const User = mongoose.model("User", UserScheme);

module.exports = User;
