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

  type CommentPaginated {
    pagesCount: Int!
    resultsCount: Int!
    currentPage: Int
    nextPage: Int
    previousPage: Int
    results: [Comment]
  }

  extend type Query {
    getComments(
      slug: String!
      sort: String
      limit: Int
      page: Int
    ): CommentPaginated
  }

  extend type Mutation {
    createComment(blogId: ID!, title: String!, comment: String!): Comment

    likeComment(commentId: ID!): Comment

    dislikeComment(commentId: ID!): Comment

    deleteComment(commentId: ID!): Boolean
  }

  extend type Subscription {
    commentAdded: Comment!
  }
`;
