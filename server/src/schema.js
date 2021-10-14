const { gql } = require("apollo-server-express");
const userTypeDef = require("./user/schema");
const commentTypeDef = require("./comment/schema");
const contactTypeDef = require("./contact/schema");
const subscriptionTypeDef = require("./subscription/schema");
const blogTypeDef = require("./blog/schema");

const rootTypeDef = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  type Subscription {
    _: String
  }
`;

const typeDefs = [
  rootTypeDef,
  userTypeDef,
  commentTypeDef,
  contactTypeDef,
  subscriptionTypeDef,
  blogTypeDef,
];

export default typeDefs;
