const {
  UserInputError,
  AuthenticationError,
  ApolloError,
  PubSub,
} = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const Comment = require("../models/comment");
const Blog = require("../models/blog");
const User = require("../models/user");
const Subscription = require("../models/subscription");

const pubsub = new PubSub();

module.exports = {
  Query: {
    allBlogs: async (root, { category, search, all }) => {
      let blogs = [];
      if (category) {
        blogs = await Blog.find({ category }).populate("author");
      } else if (search) {
        blogs = await Blog.find({
          $or: [
            { category: { $regex: search, $options: "ix" } },
            { tags: { $regex: search, $options: "ix" } },
            { title: { $regex: search, $options: "ix" } },
          ],
        }).populate("author");
      } else if (all) {
        blogs = await Blog.find({}).populate("author");
      }

      return blogs;
    },
    blogDetail: async (root, { slug }) => {
      try {
        blog = await Blog.findOne({ slug })
          .populate("author", "name")
          .populate("comments")
          .populate({
            path: "comments",
            populate: {
              path: "author",
            },
          });

        return blog;
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: { slug },
        });
      }
    },
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
    userDetail: async (root, { userId }) => {
      try {
        user = await User.findById(userId)
          .populate({
            path: "blogs",
            populate: {
              path: "author",
            },
          })
          .populate({
            path: "savedBlogs",
            populate: {
              path: "author",
            },
          })
          .populate({
            path: "comments",
            populate: {
              path: "blog",
            },
          });
        return user;
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: { userId },
        });
      }
    },
    featuredBlogDetail: async (root, { top, field, order }) => {
      const sortOrder = order === "descending" ? "-" : "";
      let blogs;
      try {
        if (field === "featured") {
          blogs = await Blog.find({ featured: true }).populate("author");
        } else {
          blogs = await Blog.find({}, null, { sort: `${sortOrder}${field}` })
            .limit(top)
            .populate("author");
        }
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: { top, field },
        });
      }

      return blogs;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    contact: async (root, { fullName, email, message }) => {
      const date = new Intl.DateTimeFormat("en-GB").format(Date.now());

      if (!fullName || !email || !message) {
        throw new UserInputError("full name, email, and message required");
      }

      const auth = {
        auth: {
          api_key: process.env.API_KEY,
          domain: process.env.DOMAIN,
        },
      };

      try {
        const transporter = nodemailer.createTransport(mailGun(auth));
        const mailOptions = {
          from: `"${fullName}" <${email}>`,
          to: process.env.EMAIL,
          subject: "flogs.me: New Message",
          text: `
          Date: ${date}
          Name: ${fullName}
          Email: ${email}
          
          Message: 
          ${message}
          `,
        };
        await transporter.sendMail(mailOptions);
        return { fullName, message, email };
      } catch (e) {
        throw new ApolloError(e.message);
      }
    },
    subscribe: async (root, { email }) => {
      try {
        existingSubscriber = await Subscription.find({ email });

        if (existingSubscriber.length > 0) {
          throw new UserInputError("already subscribed");
        }

        const subscriber = new Subscription({
          email,
        });

        await subscriber.save();

        return { email };
      } catch (e) {
        throw new ApolloError(e.message);
      }
    },
    saveBlog: async (root, { blogId }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const user = await User.findById(currentUser._id);

      if (user.savedBlogs.includes(blogId)) {
        throw new ApolloError("blog already saved");
      }

      try {
        user.savedBlogs = user.blogs.concat(blogId);
        await user.save();
        return;
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: { blogId },
        });
      }
    },
    addBlog: async (
      root,
      { title, slug, category, tags, content, img },
      { currentUser }
    ) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      let blog = new Blog({
        title,
        slug,
        category,
        tags,
        content,
        img,
        author: currentUser._id,
      });

      try {
        const user = await User.findById(currentUser._id);
        user.blogs = user.blogs.concat(blog._id);

        await user.save();
        await blog.save();
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: { title, author, published, genres },
        });
      }

      blog = await Blog.findById(blog._id).populate("author");

      return blog;
    },
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
    removeBlogs: async (root, { blogId }, { currentUser }) => {
      if (!currentUser || currentUser.userType !== "admin") {
        throw new AuthenticationError("not authenticated");
      }

      try {
        // Remove blogs from blog collection
        const blog = await Blog.findByIdAndDelete(blogId);

        // Remove blog from author
        await User.update({ _id: blog.author }, { $pull: { blogs: blogId } });

        //Remove comments from blog
        await Comment.deleteMany({ blog: blogId });

        //Remove blog from saved blogs list for each user
        await User.update({}, { $pull: { savedBlogs: blogId } });
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: { blogId },
        });
      }

      return blog;
    },
    featureBlogs: async (root, { blogId, type }, { currentUser }) => {
      if (!currentUser || currentUser.userType !== "admin") {
        throw new AuthenticationError("not authenticated");
      }
      try {
        if (type === "setFeatured") {
          await Blog.updateMany(
            { _id: { $in: blogId } },
            { $set: { featured: true } }
          );
        } else if (type.toString() === "setNonFeatured") {
          await Blog.updateMany(
            { _id: { $in: blogId } },
            { $set: { featured: false } }
          );
        }
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: { blogId },
        });
      }

      return true;
    },
    createUser: async (root, { name, email, password }, { currentUser }) => {
      if (currentUser) {
        throw new AuthenticationError("logout first to create user");
      }

      const existingUser = await User.find({ email });

      if (!name || name.length < 3) {
        throw new UserInputError("name must be more than 3 characters");
      }

      if (existingUser.length > 0) {
        throw new UserInputError("email already in use");
      }

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = new User({
        name,
        email,
        passwordHash,
      });

      try {
        const savedUser = await user.save();
        return savedUser;
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: { name, email, password },
        });
      }
    },
    changeSubscription: async (root, { subscribe }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const user = await User.findByIdAndUpdate(
        currentUser.id,
        { subscribed: subscribe },
        {
          new: true,
        }
      );

      return user;
    },
    editEmail: async (root, { newEmail }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const existingEmail = await User.find({ email: newEmail });

      if (existingEmail.length > 0) {
        throw new UserInputError("Email already in use");
      }

      const updatedUser = {
        email: newEmail,
      };

      const newUser = await User.findByIdAndUpdate(
        currentUser.id,
        updatedUser,
        {
          new: true,
        }
      );

      const userForToken = {
        email: newUser.email,
        id: newUser._id,
      };

      const token = { value: jwt.sign(userForToken, process.env.SECRET) };

      return token;
    },
    editPassword: async (root, { password, newPassword }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const passwordCorrect =
        user === null
          ? false
          : await bcrypt.compare(password, currentUser.passwordHash);

      if (!(user && passwordCorrect)) {
        throw new UserInputError("incorrect current password");
      }

      if (!newPassword || newPassword.length < 3) {
        throw new UserInputError("password minimum length 3");
      }

      const saltRounds = 10;
      passwordHash = await bcrypt.hash(newPassword, saltRounds);

      const updatedUser = {
        passwordHash,
      };

      const newUser = await User.findByIdAndUpdate(
        currentUser.id,
        updatedUser,
        {
          new: true,
        }
      );

      const userForToken = {
        email: newUser.email,
        id: newUser._id,
      };

      const token = { value: jwt.sign(userForToken, process.env.SECRET) };

      return token;
    },
    login: async (root, { email, password }, { currentUser }) => {
      if (currentUser) {
        throw new AuthenticationError(
          "logout first to login with alternate account"
        );
      }

      const user = await User.findOne({ email });
      const passwordCorrect =
        user === null
          ? false
          : await bcrypt.compare(password, user.passwordHash);

      if (!(user && passwordCorrect)) {
        throw new UserInputError("invalid email or password");
      }

      const userForToken = {
        email: user.email,
        id: user._id,
      };

      const token = { value: jwt.sign(userForToken, process.env.SECRET) };

      return token;
    },
  },
  //   Subscription: {
  //     commentAdded: {
  //       subscribe: () => pubsub.asyncIterator(["COMMENT_ADDED"])
  //     }
  //   }
};
