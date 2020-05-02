import { gql } from "@apollo/client";

const BLOG_DETAILS = gql`
  fragment BlogDetails on Blog {
    _id
    title
    slug
    date
    featured
    author {
      _id
      name
    }
    category
    tags
  }
`;

export const ALL_BLOGS = gql`
  query allBlogs($category: String, $search: String, $all: Boolean) {
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
      similarBlogs {
        slug
        title
        date
        author {
          _id
          name
        }
        comments {
          _id
        }
      }
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
    $similarBlogs: [ID]
  ) {
    addBlog(
      title: $title
      slug: $slug
      category: $category
      tags: $tags
      content: $content
      img: $img
      similarBlogs: $similarBlogs
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

export const FEATURED_BLOGS = gql`
  query featuredBlogDetail($top: Int!, $field: String!, $order: String!) {
    featuredBlogDetail(top: $top, field: $field, order: $order) {
      title
      date
      slug
      category
      comments {
        _id
      }
      author {
        _id
        name
      }
    }
  }
`;

export const DELETE_BLOGS = gql`
  mutation removeBlogs($blogId: ID!) {
    removeBlogs(blogId: $blogId)
  }
`;

export const SET_FEATURE_BLOGS = gql`
  mutation featureBlogs($blogId: [ID!], $type: String!) {
    featureBlogs(blogId: $blogId, type: $type)
  }
`;
