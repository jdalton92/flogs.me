const { gql } = require("apollo-server-express");

module.exports = gql`
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

  extend type Query {
    allBlogs(category: String, search: String, all: Boolean): [Blog]
    blogDetail(slug: String!): Blog!
    featuredBlogDetail(top: Int!, field: String!, order: String!): [Blog!]
  }

  extend type Mutation {
    addBlog(
      title: String!
      slug: String!
      category: String!
      tags: [String]!
      content: String!
      img: String
      similarBlogs: [ID]
    ): Blog

    editBlog(
      _id: ID!
      title: String!
      slug: String!
      category: String!
      tags: [String]!
      content: String!
      img: String
      similarBlogs: [ID]
    ): Blog

    saveBlog(blogId: ID!): Blog

    removeBlogs(blogId: ID!): Boolean

    featureBlogs(blogId: [ID!], type: String!): Boolean
  }
`;
