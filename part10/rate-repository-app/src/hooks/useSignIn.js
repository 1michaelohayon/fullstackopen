import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutation";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-native";


const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const navigate = useNavigate();

  const signIn = async ({ username, password }) => {
    const credentials = { username, password }
    const { data } = await mutate({ variables: { credentials: credentials } })

    await authStorage.setAcessToken(data.authenticate.accessToken)
    apolloClient.resetStore()
    navigate('/')
    return data
  };

  return [signIn, result];
};

export default useSignIn