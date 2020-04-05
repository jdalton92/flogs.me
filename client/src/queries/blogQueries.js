import { gql } from "@apollo/client";

const BLOG_DETAILS = gql`
  fragment BlogDetails on Blog {
    title
    date
    author {
      name
    }
    category
    tags
  }
`;

export const ALL_BLOGS = gql`
  query allBlogs($category: String, $search: String) {
    allBlogs(category: $category, search: $search) {
      ...BlogDetails
      _id
      comments {
        _id
      }
    }
  }
  ${BLOG_DETAILS}
`;

export const GET_BLOG = gql`
  query blogDetail($blogId: ID!) {
    blogDetail(blogId: $blogId) {
      ...BlogDetails
      content
      img
      comments {
        _id
        author {
          name
        }
        title
        comment
        date
        likes
        dislikes
      }
    }
  }
  ${BLOG_DETAILS}
`;

export const ADD_BLOG = gql`
  mutation addBlog(
    $authorId: ID!
    $title: String!
    $category: String!
    $tags: [String!]!
    $content: String!
    $img: String
  ) {
    addBlog(
      author: $authorId
      title: $title
      category: $category
      tags: $tags
      content: $content
      img: $img
    ) {
      ...BlogDetails
    }
  }
  ${BLOG_DETAILS}
`;

export const COMMENT_ADDED = gql`
  subscription {
    commentAdded {
      _id
    }
  }
`;
