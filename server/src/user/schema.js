import apollo from "apollo-server-express";
const { gql } = apollo;

export default gql`
  type User {
    name: String!
    email: String!
    passwordHash: String!
    userType: String!
    blogs: [Blog]
    savedBlogs: [Blog]
    subscribed: Boolean!
    comments: [Comment]
    _id: ID!
  }

  type Token {
    value: String!
  }

  extend type Query {
    getUser(userId: ID!): User!

    getMe: User
  }

  extend type Mutation {
    createUser(name: String!, email: String!, password: String!): Token

    updateUserEmail(newEmail: String!): Token

    updateUserPassword(password: String!, newPassword: String!): Token

    updateUserSubscription(subscribe: Boolean!): User

    login(email: String!, password: String!): Token
  }
`;
