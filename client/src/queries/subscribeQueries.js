import { gql } from "@apollo/client";

export const SUBSCRIBE = gql`
  mutation subscribe($email: String!) {
    subscribe(email: $email)
  }
`;
