import { gql } from "@apollo/client";

const BLOG_DETAILS = gql`
  fragment BlogDetails on Blog {
    title
    author {
      ...AuthorDetails
    }
    genres
    published
    id
  }
  ${BLOG_DETAILS}
`;

export const ALL_BLOGS = gql`
  query allBlogs($category: String, $search: String) {
    allBlogs(category: $category, search: $search) {
      ...BookDetails
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
