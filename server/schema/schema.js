const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    name: String!
    email: String!
    passwordHash: String!
    id: ID!
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
    id: ID!
  }

  type Comment {
    date: String!
    author: User!
    blog: Blog!
    title: String!
    comment: String!
    id: ID!
  }

  type Query {
    allBlogs(category: String, search: String): [Blog!]!
    blogDetail(id: Int!): Blog
    me: User
  }

  type Mutation {
    addBlog(
      authorId: ID!
      title: String!
      category: String!
      tags: [String]!
      content: String!
      img: String
    ): Blog

    addComment(blogId: ID!, title: String!, comment: String!): Comment

    likeComment(commentId: ID!): Comment

    dislikeComment(commentId: ID!): Comment

    createUser(name: String!, email: String!, password: String!): User

    editEmail(newEmail: String!): User

    editPassword(password: String!, newPassword: String!): User

    login(email: String!, password: String!): Token
  }
`;
