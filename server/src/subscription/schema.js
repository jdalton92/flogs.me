const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Mutation {
    subscribe(email: String!): User
  }
`;
