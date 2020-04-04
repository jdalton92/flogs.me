const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  email: {
    type: String,
    unique: true,
    minlength: 3,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    }
  ]
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model("User", schema);
