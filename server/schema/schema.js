const { gql } = require("apollo-server-express");

const schema = gql`
  type User {
    name: String!
    email: String!
    passwordHash: String!
    userType: String!
    savedBlogs: [Blog]
    comments: [Comment]
    _id: ID!
  }

  type Token {
    value: String!
  }

  type Blog {
    date: String!
    author: User!
    title: String!
    category: String!
    tags: [String]!
    content: String!
    img: String
    comments: [Comment!]
    _id: ID!
  }

  type Comment {
    date: String!
    author: User!
    blog: Blog!
    title: String!
    comment: String!
    likes: Int!
    dislikes: Int!
    _id: ID!
  }

  type Contact {
    fullName: String!
    email: String!
    message: String!
  }

  type Query {
    allBlogs(category: String, search: String): [Blog!]
    blogDetail(blogId: ID!): Blog!
    commentDetail(blogId: ID!): [Comment]
    userDetail(userId: ID!): User!
    me: User
  }

  type Mutation {
    contact(fullName: String!, email: String!, message: String!): Contact

    subscribe(email: String!): User

    addBlog(
      title: String!
      category: String!
      tags: [String]!
      content: String!
      img: String
    ): Blog

    saveBlog(blogId: ID!): Blog

    addComment(blogId: ID!, title: String!, comment: String!): Comment

    likeComment(commentId: ID!): Comment

    dislikeComment(commentId: ID!): Comment

    createUser(name: String!, email: String!, password: String!): User

    editEmail(newEmail: String!): User

    editPassword(password: String!, newPassword: String!): User

    login(email: String!, password: String!): Token
  }

  type Subscription {
    commentAdded: Comment!
  }
`;

module.exports = schema;
