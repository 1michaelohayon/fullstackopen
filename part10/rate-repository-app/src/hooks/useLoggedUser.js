import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LOGGED_USER } from '../graphql/queries';


const useLoggedUser = (includeReviews) => {
  const [logged, setLoggedUser] = useState();

  const response = useQuery(GET_LOGGED_USER, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network'
  });

  const loading = response.loading;

  const fetchLoggedUser = async () => {

    console.log('Logged:', response.data.me);

    if (response.data) {
      setLoggedUser(response.data.me)
    }
  };

  useEffect(() => {
    if (response.data) {
      fetchLoggedUser();
    }
  }, [response.data]);


  return { logged, loading, refetch: response.refetch };

};

export default useLoggedUser;