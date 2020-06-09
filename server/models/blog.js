const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  category: {
    type: String,
    required: true,
    minlength: 3,
    enum: ["money", "lifestyle", "other-shit"],
  },
  tags: [
    {
      type: String,
      minlength: 3,
    },
  ],
  featured: {
    type: Boolean,
    required: true,
    default: false,
  },
  similarBlogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  date: {
    type: Date,
    require: true,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  img: {
    type: String, //Store URL of image
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

schema.plugin(uniqueValidator);

//Set which fields are 'text' for searching by string
schema.index({
  title: "text",
  category: "text",
  tags: "text",
});

module.exports = mongoose.model("Blog", schema);
