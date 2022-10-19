import { useLazyQuery } from '@apollo/client';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';

const useRepoById = () => {
const navigate = useNavigate()
const [currentID, setCurrentID] = useState();

  const [getById, response] = useLazyQuery(GET_REPOSITORY_BY_ID, {
    fetchPolicy: 'cache-and-network'
  })
  const { loading, data, fetchMore, ...result } = response;


  const getRepoById = async (id) => {
    await getById({ variables: { repositoryId: id, first: 3 } })
    setCurrentID(id)
    navigate(id)
  }

  console.log('repobyid data', data?.repository.reviews.pageInfo.endCursor);

  const handleFetchMore = () => {
    console.log("reviews pageinfo =", data?.repository.reviews.pageInfo.endCursor)
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) { return };
    console.log('TRIGGERED');
        console.log('fetchMore', fetchMore);

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        repositoryId: currentID, first: 2
      },
    });
  };



  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    getRepoById,
    loading,
    ...result
  };

};

export default useRepoById;