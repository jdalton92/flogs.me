import apollo from "apollo-server-express";
const { gql } = apollo;

export default gql`
  type Blog {
    date: String!
    author: User!
    title: String!
    slug: String!
    category: String!
    tags: [String]!
    content: String!
    img: String
    featured: Boolean!
    similarBlogs: [Blog]!
    comments: [Comment!]
    _id: ID!
  }

  type BlogPaginated {
    pagesCount: Int!
    resultsCount: Int!
    currentPage: Int
    nextPage: Int
    previousPage: Int
    results: [Blog]
  }

  extend type Query {
    getAllBlogs(sort: String): [Blog]

    getBlogs(
      category: String
      sort: String
      limit: Int
      page: Int
    ): BlogPaginated

    searchBlogs(
      searchTerm: String
      sort: String
      limit: Int
      page: Int
    ): BlogPaginated

    getBlog(slug: String!): Blog!

    getFeaturedBlogs(top: Int!, field: String!, order: String!): [Blog!]
  }

  extend type Mutation {
    createBlog(
      title: String!
      slug: String!
      category: String!
      tags: [String]!
      content: String!
      img: String
      similarBlogs: [ID]
    ): Blog

    updateBlog(
      _id: ID!
      title: String!
      slug: String!
      category: String!
      tags: [String]!
      content: String!
      img: String
      similarBlogs: [ID]
    ): Blog

    favoriteBlog(blogId: ID!): Blog

    deleteBlog(blogId: ID!): Boolean

    featureBlogs(blogId: [ID!], type: String!): Boolean
  }
`;
