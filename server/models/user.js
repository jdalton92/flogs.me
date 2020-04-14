const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    default: "standard",
  },
  email: {
    type: String,
    unique: true,
    minlength: 3,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  savedBlogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model("User", schema);
