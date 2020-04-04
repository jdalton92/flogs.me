const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3
  },
  category: {
    type: String,
    required: true,
    minlength: 3,
    enum: ["money", "lifestyle", "other shit"]
  },
  tags: [
    {
      type: String,
      minlength: 3
    }
  ],
  date: {
    type: Date,
    require: true,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  content: {
    type: String,
    required: true
  },
  img: {
    type: String //Store URL of image
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Blog", schema);
