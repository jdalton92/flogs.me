const { gql } = require("apollo-server-express");

const schema = gql`
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

  type Blog {
    date: String!
    author: User!
    title: String!
    slug: String!
    category: String!
    tags: [String]!
    content: String!
    img: String
    featured: Boolean!
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
    allBlogs(category: String, search: String, all: String): [Blog]
    blogDetail(slug: String!): Blog!
    commentDetail(slug: String!): [Comment]
    userDetail(userId: ID!): User!
    featuredCommentDetail(top: Int!, field: String!): [Comment!]
    featuredBlogDetail(top: Int!, field: String!): [Blog!]
    me: User
  }

  type Mutation {
    contact(fullName: String!, email: String!, message: String!): Contact

    subscribe(email: String!): User

    addBlog(
      title: String!
      slug: String!
      category: String!
      tags: [String]!
      content: String!
      img: String
    ): Blog

    saveBlog(blogId: ID!): Blog

    addComment(blogId: ID!, title: String!, comment: String!): Comment

    likeComment(commentId: ID!): Comment

    dislikeComment(commentId: ID!): Comment

    removeBlogs(blogId: [ID!]): Blog

    featureBlogs(blogId: [ID!], type: String!): Boolean

    createUser(name: String!, email: String!, password: String!): User

    editEmail(newEmail: String!): Token

    editPassword(password: String!, newPassword: String!): Token

    login(email: String!, password: String!): Token
  }

  type Subscription {
    commentAdded: Comment!
  }
`;

module.exports = schema;
