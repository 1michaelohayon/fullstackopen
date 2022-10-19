import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';


const useRepositories = (mutationArgs, searchKeyword) => {
  const { orderBy, orderDirection } = mutationArgs

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword, first: 4
     },
    fetchPolicy: 'cache-and-network'
  });



  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) { return };
    console.log('fetchMore123', fetchMore);

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
         orderBy, orderDirection, searchKeyword, first: 4
      },
    });
  };


  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result
  };
};

export default useRepositories;