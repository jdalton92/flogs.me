const { gql } = require("apollo-server-express");

module.exports = gql`
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

  extend type Query {
    commentDetail(slug: String!): [Comment]
  }

  extend type Mutation {
    addComment(blogId: ID!, title: String!, comment: String!): Comment

    likeComment(commentId: ID!): Comment

    dislikeComment(commentId: ID!): Comment
  }

  extend type Subscription {
    commentAdded: Comment!
  }
`;
