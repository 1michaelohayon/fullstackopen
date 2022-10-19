import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';
import Constants from 'expo-constants';
import { Link } from "react-router-native";
import { ScrollView } from 'react-native';
import useLoggedUser from '../hooks/useLoggedUser';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row',

  },
  tab: {
    padding: 10
  },
  row: {
    flexDirection: 'row'
  }
});

const AppBar = () => {
  const { logged } = useLoggedUser(false)
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()

  const logout = async () => {
    await authStorage.removeAcessToken()
    apolloClient.resetStore()

  }

  const logoutTab = (
    <View style={styles.tab}>
      <Pressable onPress={() => logout()}>
        <Text
          fontWeight="bold"
          color="white"
          fontSize="subheading">
          Sign out
        </Text>
      </Pressable>
    </View>
  )




  return <View style={styles.container}>
    <ScrollView horizontal={true}>
      <AppBarTab to="/" title={"Repositories"} />
      {logged
        ? <View style={styles.row}>
          <AppBarTab to="/createreview" title={"Create a review"} />
          <AppBarTab to="/userreviews" title={"User reviews"} />
          {logoutTab}
        </View>
        : <View style={styles.row}>
          <AppBarTab to="/signin" title={"Sign In"} />
          <AppBarTab to="/signup" title={"Sign Up"} />
        </View>
      }
    </ScrollView>
  </View>;
};

export default AppBar;

const AppBarTab = (props) => <Link to={props.to}>
  <View style={styles.tab}>
    <Text
      fontWeight="bold"
      color="white"
      fontSize="subheading">{props.title}
    </Text>
  </View>
</Link>
