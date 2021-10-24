import apollo from "apollo-server-express";
const { UserInputError, AuthenticationError, PubSub } = apollo;

import Comment from "./model.js";
import Blog from "../blog/model.js";
import User from "../user/model.js";

// const pubsub = new PubSub();

const createComment = async (
  root,
  { blogId, title, comment },
  { currentUser }
) => {
  if (!currentUser) {
    throw new AuthenticationError("not authenticated");
  }

  const blog = await Blog.findById(blogId);

  let newComment = new Comment({
    author: currentUser._id,
    likes: 0,
    dislikes: 0,
    blog: blogId,
    title,
    comment,
  });

  try {
    const user = await User.findById(currentUser._id);
    user.comments = user.comments.concat(newComment._id);
    blog.comments = blog.comments.concat(newComment._id);

    await newComment.save();
    await user.save();
    await blog.save();
  } catch (e) {
    throw new UserInputError(e.message, {
      invalidArgs: { blogId, title, comment },
    });
  }

  const returnComment = await Comment.findById(newComment._id).populate(
    "author"
  );

  // TODO: workout subscriptions
  // pubsub.publish("COMMENT_ADDED", { commentAdded: returnComment });

  return returnComment;
};

const deleteComment = async (root, { commentId }, { currentUser }) => {
  if (!currentUser) {
    throw new AuthenticationError("not authenticated");
  }
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new UserInputError("comment does not exist");
  }

  if (currentUser._id.toString() !== comment.author.toString()) {
    throw new AuthenticationError(
      "Only comment authors can their delete comments"
    );
  }

  try {
    await Blog.findByIdAndUpdate(comment.blog, {
      $pull: { comments: commentId },
    });

    await User.findByIdAndUpdate(
      { _id: comment.author },
      { $pull: { comments: commentId } }
    );

    await Comment.findByIdAndDelete(commentId);
  } catch (e) {
    throw new UserInputError(e.message, {
      invalidArgs: { commentId },
    });
  }

  return true;
};

const likeComment = async (root, { commentId }, { currentUser }) => {
  if (!currentUser) {
    throw new AuthenticationError("not authenticated");
  }

  const comment = await Comment.findByIdAndUpdate(commentId, {
    $inc: { likes: 1 },
  });

  return comment;
};

const dislikeComment = async (root, { commentId }, { currentUser }) => {
  if (!currentUser) {
    throw new AuthenticationError("not authenticated");
  }

  const comment = await Comment.findByIdAndUpdate(commentId, {
    $inc: { dislikes: 1 },
  });

  return comment;
};

export default { createComment, likeComment, dislikeComment, deleteComment };
