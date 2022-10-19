import { gql } from '@apollo/client';
import { REPOSITORY_BSAE } from './fragments'

export const GET_REPOSITORIES = gql`
query Repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String, $first: Int, $after: String) {
  repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword, first: $first, after: $after) {
    edges {
      node {
        ...repositoryBase
      }
      cursor
    }
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
  }
}
${REPOSITORY_BSAE}

`



export const GET_LOGGED_USER = gql`
query getCurrentUser($includeReviews: Boolean = false) {
  me {
    id
    username
    reviews @include(if: $includeReviews){
      edges {
        cursor
        node {
          user {
            username
          }
          rating
          id
          text
          createdAt
          repositoryId
          repository {
            fullName
          }
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
    username
    createdAt
    reviewCount
  }
}
`

export const GET_REPOSITORY_BY_ID = gql`
query Query($repositoryId: ID!, $first: Int, $after: String) {
  repository(id: $repositoryId) {
    ...repositoryBase
    url
    reviews(first: $first, after: $after) {
      edges {
        cursor
        node {
          user {
            username
          }
          rating
          id
          text
          createdAt
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
}
${REPOSITORY_BSAE}

`
