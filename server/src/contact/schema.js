import apollo from "apollo-server-express";
const { gql } = apollo;

export default gql`
  type Contact {
    fullName: String!
    email: String!
    message: String!
  }

  extend type Mutation {
    contact(fullName: String!, email: String!, message: String!): Contact
  }
`;
