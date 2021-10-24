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

  extend type Query {
    getBlogs(category: String, search: String, all: Boolean): [Blog]

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
