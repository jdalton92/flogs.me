const { gql } = require("apollo-server-express");

module.exports = gql`
  type Contact {
    fullName: String!
    email: String!
    message: String!
  }

  extend type Mutation {
    contact(fullName: String!, email: String!, message: String!): Contact
  }
`;
