import { gql } from "@apollo/client";

const BLOG_DETAILS = gql`
  fragment BlogDetails on Blog {
    title
    date
    author {
      _id
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

export const SAVE_BLOG = gql`
  mutation saveBlog($blogId: ID!) {
    saveBlog(blogId: $blogId) {
      _id
    }
  }
`;

export const GET_BLOG = gql`
  query blogDetail($blogId: ID!) {
    blogDetail(blogId: $blogId) {
      ...BlogDetails
      content
      img
      comments {
        _id
      }
    }
  }
  ${BLOG_DETAILS}
`;

export const ADD_BLOG = gql`
  mutation addBlog(
    $title: String!
    $category: String!
    $tags: [String!]!
    $content: String!
    $img: String
  ) {
    addBlog(
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
