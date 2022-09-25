import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  author {
    name
    bookCount
    born
    id
  }
  published
  genres
  id
}
`



export const ALL_BOOKS = gql`
query allBooks($genre: String) {
  allBooks(genre: $genre) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`


export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    bookCount
    born
  }
}`

export const CREATE_BOOK = gql`
mutation($title: String!, $author: String!, $published: Int!,, $genres: [String]) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
    author {
      name
      born
      bookCount
    }
    published
    genres
  }
}`

export const EDIT_BIRTHYEAR = gql`
mutation($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
  }
}
`

export const LOGIN = gql`
mutation($username: String!, $password: String) {
  login(username: $username, password: $password) {
    value
  }
}
`

export const ME = gql`
query {
  me {
    username
    favouriteGenre
  }
}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
    ...BookDetails
   }
 }
${BOOK_DETAILS}
`