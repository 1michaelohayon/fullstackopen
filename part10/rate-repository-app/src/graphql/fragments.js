import { gql } from '@apollo/client';

export const REPOSITORY_BSAE = gql`
  fragment repositoryBase on Repository {
   id
   fullName
   description
   language
   stargazersCount
   forksCount
   reviewCount
   ownerAvatarUrl
   ratingAverage
 }
`