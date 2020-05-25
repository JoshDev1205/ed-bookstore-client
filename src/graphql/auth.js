import gql from 'graphql-tag'

export const AUTH_SIGNUP = gql`
  mutation register($data: signUpInput!) {
    signUp(data: $data) {
      user {
        id
        name
        lastname
        email
      }
      token
    }
  }
`

export const AUTH_SIGNIN = gql`
  mutation loginUser($data: loginInput!) {
    login(data: $data) {
      token
      user {
        id
        name
        lastname
        email
      }
    }
  }
`
