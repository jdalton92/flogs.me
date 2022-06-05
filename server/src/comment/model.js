import mongoose from "mongoose";
import { paginate } from "../../utils/paginate.js";

const schema = new mongoose.Schema({
  date: {
    type: Date,
    require: true,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
  comment: {
    type: String,
    required: true,
    minlength: 3,
  },
  likes: {
    type: Number,
  },
  dislikes: {
    type: Number,
  },
});

schema.statics.paginate = paginate;

export default mongoose.model("Comment", schema);
