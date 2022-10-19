import { View, Image, StyleSheet } from "react-native"
import { Pressable } from "react-native";
import Text from "./Text"
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: theme.colors.backgroundSecondry
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: theme.roundness,
  },
  logo: {
    width: 66,
    height: 58,
  },
  language: {
    backgroundColor: theme.colors.emphasisPrimary,
    padding: 5,
    borderRadius: theme.roundness,
  },
  contained: {
    flexDirection: 'row',
    marginTop: 10,
  },
  col: {
    margin: 7,
    flexDirection: 'collum',

  },
  button: {
    backgroundColor: theme.colors.emphasisPrimary,
    padding: 17,
    margin: 10,
    marginStart: 10,
    marginEnd: 10,
    borderRadius: theme.roundness,
  },
});




const RepositoryItem = ({ item }) => {

  return (
    <View testID="repositoryItem" key={item.id} style={styles.container}>
        <View style={styles.contained}>
          <View style={styles.col}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.ownerAvatarUrl,
              }}
            />
          </View>
          <View style={styles.col}>
            <Text fontWeight="bold">{item.fullName}</Text>
            <Text color="textSecondary">{`\n ${item.description}`}
            </Text>
            <Tag title={item.language} />
          </View>
        </View>

        <View style={styles.contained}>
          <Stat number={item.stargazersCount} title="Stars" />
          <Stat number={item.forksCount} title="Forks" />
          <Stat number={item.reviewCount} title="Reviews" />
          <Stat number={item.ratingAverage} title="Rating" />
        </View>
    </View>
  )
}

export default RepositoryItem





export const Stat = ({ number, title }) => {
  const numberParser = (number) => number >= 1000
    ? `${Number.parseFloat(number / 1000).toFixed(1)}k`
    : number
  return (
    <View style={styles.col}>
      <Text fontWeight="bold" style={({ textAlign: "center" })}>{numberParser(number)}</Text>
      <Text color="textSecondary">{title}</Text>
    </View>
  )
}

export const Tag = ({ title }) => {
  return <View style={styles.contained}>
    <View style={styles.language}>
      <Text color="white">{title}</Text>
    </View>
  </View>

}
