const {
  UserInputError,
  AuthenticationError,
  PubSub,
} = require("apollo-server-express");

const Comment = require("./model");
const Blog = require("../blog/model");
const User = require("../user/model");

const pubsub = new PubSub();

export const addComment = async (
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

export const likeComment = async (root, { commentId }, { currentUser }) => {
  if (!currentUser) {
    throw new AuthenticationError("not authenticated");
  }

  let comment = await Comment.findById(commentId);

  const updatedComment = { likes: comment.likes + 1 };

  const newComment = await Comment.findByIdAndUpdate(
    commentId,
    updatedComment,
    {
      new: true,
    }
  );

  return newComment;
};

export const dislikeComment = async (root, { commentId }, { currentUser }) => {
  if (!currentUser) {
    throw new AuthenticationError("not authenticated");
  }

  let comment = await Comment.findById(commentId);

  const updatedComment = { dislikes: comment.dislikes + 1 };

  const newComment = await Comment.findByIdAndUpdate(
    commentId,
    updatedComment,
    {
      new: true,
    }
  );

  return newComment;
};
