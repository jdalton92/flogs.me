import { gql } from "@apollo/client";

const USER_DETAILS = gql`
  fragment UserDetails on User {
    name
    email
    _id
  }
`;

export const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      value
    }
  }
`;

export const ME = gql`
  query {
    me {
      name
      email
      userType
      _id
    }
  }
`;

export const GET_USER = gql`
  query userDetail($userId: ID!) {
    userDetail(userId: $userId) {
      ...UserDetails
      userType
      blogs {
        _id
        title
        category
        date
        comments {
          _id
        }
      }
      comments {
        _id
      }
      savedBlogs {
        _id
        title
        category
        date
        comments {
          _id
        }
      }
    }
  }
  ${USER_DETAILS}
`;
