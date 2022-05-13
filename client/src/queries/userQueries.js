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
      value
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      value
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation updateUserPassword($password: String!, $newPassword: String!) {
    updateUserPassword(password: $password, newPassword: $newPassword) {
      value
    }
  }
`;

export const CHANGE_EMAIL = gql`
  mutation updateUserEmail($newEmail: String!) {
    updateUserEmail(newEmail: $newEmail) {
      value
    }
  }
`;

export const CHANGE_SUBSCRIPTION = gql`
  mutation updateUserSubscription($subscribe: Boolean!) {
    updateUserSubscription(subscribe: $subscribe) {
      subscribed
    }
  }
`;

export const GET_ME = gql`
  query {
    getMe {
      _id
      name
      email
      userType
      subscribed
    }
  }
`;

export const GET_USER = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      ...UserDetails
      userType
      subscribed
      blogs {
        _id
        author {
          name
        }
        title
        category
        date
        slug
        comments {
          _id
        }
      }
      comments {
        _id
        likes
        dislikes
        title
        blog {
          title
          slug
        }
      }
      savedBlogs {
        _id
        title
        category
        date
        slug
        author {
          name
        }
        comments {
          _id
        }
      }
    }
  }
  ${USER_DETAILS}
`;
