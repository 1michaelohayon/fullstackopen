import { gql } from '@apollo/client';


export const SIGN_IN = gql`
mutation Mutation($credentials: AuthenticateInput) {
  authenticate(credentials: $credentials) {
    accessToken
    user {
      id
      username
    }
  }
}
`

export const CREATE_REVIEW =gql`
mutation CreateReview($review: CreateReviewInput) {
  createReview(review: $review) {
    id
    text
    repositoryId
    userId
    createdAt
    rating
  }
}
`

export const CREATE_USER =gql`
mutation Mutation($user: CreateUserInput) {
  createUser(user: $user) {
    id
    username
  }
}
`

export const DELETE_REVIEW =gql`
mutation DeleteReview($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}
`