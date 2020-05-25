import gql from 'graphql-tag'

const BOOK_FRAGMENT = gql`
  fragment BookAllFields on Book {
    id
    title
    description
    quantity
    price
    writted_by {
      id
      name
    }
  }
`

export const BOOK_GETALL = gql`
  query getAllBooks {
    book {
      ...BookAllFields
    }
  }
  ${BOOK_FRAGMENT}
`
export const BOOK_CREATE = gql`
  mutation createNewBook($data: createBookInput!) {
    createBook(data: $data) {
      ...BookAllFields
    }
  }
  ${BOOK_FRAGMENT}
`
export const BOOK_GETBYID = gql`
  query getBookById($id: ID) {
    book(id: $id) {
      ...BookAllFields
    }
  }
  ${BOOK_FRAGMENT}
`
export const BOOK_UPDATE = gql`
  mutation updateBookData($id: ID!, $data: updateBookInput) {
    updateBook(id: $id, data: $data) {
      ...BookAllFields
    }
  }
  ${BOOK_FRAGMENT}
`
