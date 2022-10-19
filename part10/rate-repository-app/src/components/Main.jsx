import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate, useParams } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import SignUp from './SignUp'
import ReviewForm from './ReviewForm';
import UserReviews from './UserReviews';

import useRepoById from '../hooks/useRepoByID';
import RepositoryView from './RepositoryView';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
    flexGrow: 1,
    flexShrink: 1,


  },
});

const Main = () => {
  const { ID } = useParams();

  const { getRepoById, repository, fetchMore } = useRepoById();

  const handleGetRepoID = async (id) => {
    await getRepoById(id)
  }

  const onEndReach = () => {
    fetchMore();

  };

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/:ID" element={<RepositoryView repository={repository} onEndReach={onEndReach} />} />
        <Route path="/" element={<RepositoryList getRepoBy={handleGetRepoID} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/createreview" element={<ReviewForm getRepoBy={handleGetRepoID} />} />
        <Route path="/userreviews" element={<UserReviews getRepoBy={handleGetRepoID}/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;