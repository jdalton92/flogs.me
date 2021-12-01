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
      userType
    }
    category
    tags
  }
`;

const PAGINATED_BLOGS = gql`
  fragment PaginatedBlogs on Blog {
    pagesCount
    resultsCount
    currentPage
    nextPage
    previousPage
  }
  ${BLOG_DETAILS}
`;

export const GET_BLOGS = gql`
  query getBlogs($category: String, $sort: String, $page: Int, $limit: Int) {
    getBlogs(category: $category, sort: $sort, page: $page, limit: $limit) {
      pagesCount
      resultsCount
      currentPage
      nextPage
      previousPage
      results {
        ...BlogDetails
        comments {
          _id
        }
      }
    }
  }
  ${BLOG_DETAILS}
`;

export const SEARCH_BLOGS = gql`
  query searchBlogs(
    $searchTerm: String
    $sort: String
    $page: Int
    $limit: Int
  ) {
    searchBlogs(
      searchTerm: $searchTerm
      sort: $sort
      page: $page
      limit: $limit
    ) {
      pagesCount
      resultsCount
      currentPage
      nextPage
      previousPage
      results {
        ...BlogDetails
        comments {
          _id
        }
      }
    }
  }
  ${BLOG_DETAILS}
`;

export const FAVORITE_BLOG = gql`
  mutation favoriteBlog($blogId: ID!) {
    favoriteBlog(blogId: $blogId) {
      _id
    }
  }
`;

export const GET_BLOG = gql`
  query getBlog($slug: String!) {
    getBlog(slug: $slug) {
      ...BlogDetails
      content
      img
      similarBlogs {
        _id
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

export const CREATE_BLOG = gql`
  mutation createBlog(
    $title: String!
    $slug: String!
    $category: String!
    $tags: [String!]!
    $content: String!
    $img: String
    $similarBlogs: [ID]
  ) {
    createBlog(
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

export const UPDATE_BLOG = gql`
  mutation updateBlog(
    $_id: ID!
    $title: String!
    $slug: String!
    $category: String!
    $tags: [String!]!
    $content: String!
    $img: String
    $similarBlogs: [ID]
  ) {
    updateBlog(
      _id: $_id
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

export const GET_FEATURED_BLOGS = gql`
  query getFeaturedBlogs($top: Int!, $field: String!, $order: String!) {
    getFeaturedBlogs(top: $top, field: $field, order: $order) {
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

export const DELETE_BLOG = gql`
  mutation deleteBlog($blogId: ID!) {
    deleteBlog(blogId: $blogId)
  }
`;

export const FEATURE_BLOGS = gql`
  mutation featureBlog($blogId: [ID!], $type: String!) {
    featureBlog(blogId: $blogId, type: $type)
  }
`;
