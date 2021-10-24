import apollo from "apollo-server-express";
const { gql } = apollo;

export default gql`
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
    getComments(slug: String!): [Comment]
  }

  extend type Mutation {
    createComment(blogId: ID!, title: String!, comment: String!): Comment

    likeComment(commentId: ID!): Comment

    dislikeComment(commentId: ID!): Comment
  }

  extend type Subscription {
    commentAdded: Comment!
  }
`;
