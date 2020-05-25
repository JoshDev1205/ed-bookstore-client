import gql from 'graphql-tag'

export const AUTHOR_GETALL = gql`
  query getAllAuthors {
    author {
      id
      name
      country
    }
  }
`
export const AUTHOR_CREATE = gql`
  mutation createNewAuthor($data: createAuthorInput!) {
    createAuthor(data: $data) {
      id
      name
      country
    }
  }
`
export const AUTHOR_GETBYID = gql`
  query getAuthorById($id: ID) {
    author(id: $id) {
      name
      country
    }
  }
`
export const AUTHOR_UPDATE = gql`
  mutation updateAuthorData($id: ID!, $data: updateAuthorInput) {
    updateAuthor(id: $id, data: $data) {
      name
      country
    }
  }
`
