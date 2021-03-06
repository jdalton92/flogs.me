import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
  query commentDetail($slug: String!) {
    commentDetail(slug: $slug) {
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

export const ADD_COMMENT = gql`
  mutation addComment($blogId: ID!, $title: String!, $comment: String!) {
    addComment(blogId: $blogId, title: $title, comment: $comment) {
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
