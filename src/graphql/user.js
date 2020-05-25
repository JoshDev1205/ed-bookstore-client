import gql from 'graphql-tag'

export const USER_UPDATE = gql`
  mutation updateUserData($id: ID!, $data: updateUserInput) {
    updateUser(id: $id, data: $data) {
      name
      lastname
    }
  }
`
