import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import Text from './Text';
import { TextInput } from 'react-native';
import theme from '../theme';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;


const RepositoryList = ({ getRepoBy }) => {
  const [searchKeywordRaw, setSearchKeyword] = useState("")
  const [sortBy, setSortBy] = useState();
  const [sortView, setSortView] = useState(null)
  const [searchKeyword] = useDebounce(searchKeywordRaw, 500);

  const mutationArgs = sortBy === "highestRated"
    ? { orderDirection: "DESC", orderBy: "RATING_AVERAGE" }
    : sortBy === "lowestRated"
      ? { orderDirection: "ASC", orderBy: "RATING_AVERAGE" }
      : { orderDirection: "DESC", orderBy: "CREATED_AT" }

  const { repositories, fetchMore } = useRepositories(mutationArgs, searchKeyword)


  const handleSortView = sortView === null ? true : null
  const handlePickerSelect = (itemValue) => {
    setSortBy(itemValue)
    setSortView(handleSortView)
  }


  const onEndReach = () => {
    fetchMore();
  };

  return <View>
    <Pressable style={({ padding: 7 })} onPress={() => setSortView(handleSortView)}>
      <Text fontSize="subheading" fontWeight="bold">Sort by...</Text>
    </Pressable>
    {sortView
      ? <Picker
        selectedValue={sortBy}
        onValueChange={(itemValue) =>
          handlePickerSelect(itemValue)
        }>
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highestRated" />
        <Picker.Item label="Lowest rated repositories" value="lowestRated" />
      </Picker>
      : null}
    <TextInput
      style={({ padding: 7, fontSize: theme.fontSizes.subheading })}
      onChangeText={setSearchKeyword}
      value={searchKeywordRaw}
      placeholder="Find"
    />
    <RepositoryListContainer repositories={repositories} getRepoBy={getRepoBy} onEndReach={onEndReach} />
  </View>
};

export default RepositoryList;


export const RepositoryListContainer = ({ repositories, getRepoBy, onEndReach }) => {

  const PressableyItem = ({ item }) => {
    return <Pressable onPress={() => getRepoBy(item.id)}><RepositoryItem item={item} /></Pressable>
  }

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const keyExtractor = ({ item }) => item.id

  return (
    <FlatList
      key={keyExtractor}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={PressableyItem}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};