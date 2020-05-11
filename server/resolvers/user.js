const {
  UserInputError,
  AuthenticationError,
} = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

module.exports = {
  Query: {
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
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
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
};
