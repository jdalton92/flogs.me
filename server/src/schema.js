import apollo from "apollo-server-express";
const { gql } = apollo;
import userTypeDef from "./user/schema.js";
import commentTypeDef from "./comment/schema.js";
import contactTypeDef from "./contact/schema.js";
import subscriptionTypeDef from "./subscription/schema.js";
import blogTypeDef from "./blog/schema.js";

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
