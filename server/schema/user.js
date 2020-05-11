const { gql } = require("apollo-server-express");

module.exports = gql`
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
    userDetail(userId: ID!): User!
    me: User
  }

  extend type Mutation {
    createUser(name: String!, email: String!, password: String!): User

    editEmail(newEmail: String!): Token

    editPassword(password: String!, newPassword: String!): Token

    changeSubscription(subscribe: Boolean!): User

    login(email: String!, password: String!): Token
  }
`;
