const {
  UserInputError,
  AuthenticationError,
  ApolloError,
  PubSub
} = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const Comment = require("../models/Comment");
const Blog = require("../models/blog");
const User = require("../models/user");
const Subscription = require("../models/Subscription");

const pubsub = new PubSub();

module.exports = {
  Query: {
    allBlogs: async (root, { category, search }) => {
      let query = {};
      let blogDetail = {};

      if (search) {
        // TO DO
        // query = { category: search, tags: search, title: search };
        // blogDetail = await Blog.find({ $text: { $search: search } }).populate(
        //   "author"
        // );
      } else {
        query = { category };
        blogDetail = await Blog.find(query).populate("author");
      }

      return blogDetail;
    },
    blogDetail: async (root, { blogId }) => {
      try {
        blog = await Blog.findById(blogId)
          .populate("author", "name")
          .populate("comments")
          .populate({
            path: "comments",
            populate: {
              path: "author"
            }
          });
        return blog;
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: { id }
        });
      }
    },
    me: (root, args, context) => {
      return context.currentUser;
    }
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
          domain: process.env.DOMAIN
        }
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
          `
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
          email
        });

        await subscriber.save();

        return { email };
      } catch (e) {
        throw new ApolloError(e.message);
      }
    },
    addBlog: async (
      root,
      { title, category, tags, content, img },
      { currentUser }
    ) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      let blog = new Blog({
        title,
        category,
        tags,
        content,
        img,
        author: currentUser._id
      });

      try {
        const user = await User.findById(currentUser._id);

        await User.findByIdAndUpdate(
          currentUser._id,
          { blogs: [...user.blogs, blog._id] },
          { new: true }
        );

        await blog.save();
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: { title, author, published, genres }
        });
      }

      blog = await Blog.findById(blog._id).populate("author");

      return blog;
    },
    addComment: async (root, { blogId, title, comment }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      let newComment = new Comment({
        author: currentUser._id,
        likes: 0,
        dislikes: 0,
        blog: blogId,
        title,
        comment
      });

      try {
        const blog = await Blog.findById(blogId);

        await Blog.findByIdAndUpdate(
          blogId,
          { comments: [...blog.comments, newComment._id] },
          { new: true }
        );

        await newComment.save();
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: { blogId, title, comment }
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
          new: true
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
          new: true
        }
      );

      return newComment;
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
        passwordHash
      });

      try {
        const savedUser = await user.save();
        return savedUser;
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: { name, email, password }
        });
      }
    },
    editEmail: async (root, { newEmail }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const currentEmail = currentUser.email;

      const user = await User.find({ email: currentEmail });
      const existingEmail = await User.find({ email: newEmail });

      if (existingEmail.length > 0) {
        throw new UserInputError("Email already in use");
      }

      const updatedUser = {
        email: newEmail,
        passwordHash
      };

      const newUser = await User.findByIdAndUpdate(
        currentUser.id,
        updatedUser,
        {
          new: true
        }
      );

      const userForToken = {
        email: newUser.email,
        id: newUser._id
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
        passwordHash
      };

      const newUser = await User.findByIdAndUpdate(
        currentUser.id,
        updatedUser,
        {
          new: true
        }
      );

      const userForToken = {
        email: newUser.email,
        id: newUser._id
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
        id: user._id
      };

      const token = { value: jwt.sign(userForToken, process.env.SECRET) };

      return token;
    }
  }
  //   Subscription: {
  //     commentAdded: {
  //       subscribe: () => pubsub.asyncIterator(["COMMENT_ADDED"])
  //     }
  //   }
};