import { gql } from "@apollo/client";

const BLOG_DETAILS = gql`
  fragment BlogDetails on Blog {
    _id
    title
    slug
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
  query allBlogs($category: String, $search: String, $all: String) {
    allBlogs(category: $category, search: $search, all: $all) {
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
  query blogDetail($slug: String!) {
    blogDetail(slug: $slug) {
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
    $slug: String!
    $category: String!
    $tags: [String!]!
    $content: String!
    $img: String
  ) {
    addBlog(
      title: $title
      slug: $slug
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

export const FEATURED_BLOG = gql`
  query featuredBlogDetail($top: Int!, $field: String!) {
    featuredBlogDetail(top: $top, field: $field) {
      title
      date
      category
      comments {
        _id
      }
      author {
        name
      }
    }
  }
`;

export const DELETE_BLOGS = gql`
  mutation removeBlogs($blogID: [ID!]) {
    removeBlogs(blogID: $blogID) {
      _id
    }
  }
`;

export const SET_FEATURE_BLOGS = gql`
  mutation featureBlogs($blogID: [ID!]) {
    featureBlogs(blogID: $blogID) {
      _id
    }
  }
`;
