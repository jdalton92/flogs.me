import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

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
  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
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
  subscribed: {
    type: Boolean,
    required: true,
    default: true,
  },
});

schema.plugin(uniqueValidator);

export default mongoose.model("User", schema);
