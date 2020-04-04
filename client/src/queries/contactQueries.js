import { gql } from "@apollo/client";

export const CONTACT = gql`
  mutation contact($fullName: String!, $email: String!, $message: String!) {
    contact(fullName: $fullName, email: $email, message: $message) {
      message
    }
  }
`;
