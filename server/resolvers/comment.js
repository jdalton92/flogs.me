const {
  UserInputError,
  AuthenticationError,
  // PubSub,
} = require("apollo-server-express");

const Comment = require("../models/comment");
const Blog = require("../models/blog");
const User = require("../models/user");

// const pubsub = new PubSub();

module.exports = {
  Query: {
    commentDetail: async (root, { slug }) => {
      try {
        blog = await Blog.findOne({ slug });
        comments = await Comment.find({ blog: blog._id }).populate(
          "author",
          "name"
        );
        return comments;
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: { blogId },
        });
      }
    },
  },
  Mutation: {
    addComment: async (root, { blogId, title, comment }, { currentUser }) => {
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
      //   pubsub.publish("COMMENT_ADDED", { commentAdded: returnComment });

      return returnComment;
    },
    likeComment: async (root, { commentId }, { currentUser }) => {
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
    },
    dislikeComment: async (root, { commentId }, { currentUser }) => {
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
    },
  },
  //   Subscription: {
  //     commentAdded: {
  //       subscribe: () => pubsub.asyncIterator(["COMMENT_ADDED"])
  //     }
  //   }
};
