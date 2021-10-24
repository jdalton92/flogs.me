import apollo from "apollo-server-express";
const { gql } = apollo;

export default gql`
  extend type Mutation {
    subscribe(email: String!): String
  }
`;
