import { ReviewItem } from "./RepositoryView";
import { View, StyleSheet, Pressable, FlatList } from "react-native";
import useDeleteReview from "../hooks/useDeleteReview";
import Text from "./Text";
import useLoggedUser from "../hooks/useLoggedUser";
import theme from "../theme";
import { Alert } from "react-native";

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.emphasisPrimary,
    padding: 17,
    margin: 10,
    marginStart: 10,
    marginEnd: 10,
    borderRadius: theme.roundness,
  },
  separator: {
    height: 10,
  },
  row: {
    backgroundColor: theme.colors.backgroundSecondry,
    flexDirection: 'row'
  }
});
const ItemSeparator = () => <View style={styles.separator} />;



const UserReviews = ({ getRepoBy }) => {
  const [deleteReview] = useDeleteReview()
  const { logged, refetch } = useLoggedUser(true)
  const reviwsNodes = logged?.reviews.edges.map(edges => edges.node);
  console.log('reviwsNodes', reviwsNodes);

  const handleDelte = async (id) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this reveiw?",
      [
        {
          text: "CANCEL",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "DELETE", onPress: async () => {await deleteReview(id); await refetch()} }
      ]

    )
  }
  const ReviewItemRepoTitle = ({ item }) => {

    return <View>
      <ReviewItem item={item} title={item.repository.fullName} />
      <View style={styles.row}>

        <Pressable onPress={() => getRepoBy(item.repositoryId)}>
          <View style={styles.button}>
            <Text color={theme.colors.textWhite} style={{ textAlign: 'center' }}>View Repository</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => handleDelte(item.id)}>
          <View style={({ ...styles.button, backgroundColor: theme.colors.error })}>
            <Text color={theme.colors.textWhite} style={{ textAlign: 'center' }}>Delete review</Text>
          </View>
        </Pressable>
      </View>

    </View>
  }



  return (
    <View>
      <FlatList
        data={reviwsNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={ReviewItemRepoTitle}
      />
    </View>
  )
}

export default UserReviews