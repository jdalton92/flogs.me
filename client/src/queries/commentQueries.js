import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
  query getComments($slug: String!) {
    getComments(slug: $slug) {
      _id
      author {
        _id
        name
      }
      title
      comment
      date
      likes
      dislikes
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($blogId: ID!, $title: String!, $comment: String!) {
    createComment(blogId: $blogId, title: $title, comment: $comment) {
      title
      author {
        name
      }
      comment
      likes
      dislikes
    }
  }
`;

export const LIKE_COMMENT = gql`
  mutation likeComment($commentId: ID!) {
    likeComment(commentId: $commentId) {
      likes
    }
  }
`;

export const DISLIKE_COMMENT = gql`
  mutation dislikeComment($commentId: ID!) {
    dislikeComment(commentId: $commentId) {
      dislikes
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId)
  }
`;
