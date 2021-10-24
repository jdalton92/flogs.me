import apollo from "apollo-server-express";
const { UserInputError, AuthenticationError } = apollo;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../../utils/config.js";
import User from "./model.js";

const createUser = async (root, { name, email, password }, { currentUser }) => {
  if (currentUser) {
    throw new AuthenticationError("logout first to create user");
  }

  const existingUser = await User.find({ email });

  if (!name || name.length < 3) {
    throw new UserInputError("name must be 3 or more characters");
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
};

const updateUserSubscription = async (root, { subscribe }, { currentUser }) => {
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
};

const updateUserEmail = async (root, { newEmail }, { currentUser }) => {
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

  const newUser = await User.findByIdAndUpdate(currentUser.id, updatedUser, {
    new: true,
  });

  const userForToken = {
    email: newUser.email,
    id: newUser._id,
  };

  const token = { value: jwt.sign(userForToken, config.SECRET) };

  return token;
};

const updateUserPassword = async (
  root,
  { password, newPassword },
  { currentUser }
) => {
  if (!currentUser) {
    throw new AuthenticationError("not authenticated");
  }

  const user = await User.findOne({ email: currentUser.email });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

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

  const newUser = await User.findByIdAndUpdate(currentUser.id, updatedUser, {
    new: true,
  });

  const userForToken = {
    email: newUser.email,
    id: newUser._id,
  };

  const token = { value: jwt.sign(userForToken, config.SECRET) };

  return token;
};

const login = async (root, { email, password }, { currentUser }) => {
  if (currentUser) {
    throw new AuthenticationError(
      "please logout prior to logging in with alternate account"
    );
  }

  const user = await User.findOne({ email });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    throw new UserInputError("invalid email or password");
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  };

  const token = { value: jwt.sign(userForToken, config.SECRET) };

  return token;
};

export default {
  createUser,
  updateUserSubscription,
  updateUserEmail,
  updateUserPassword,
  login,
};
