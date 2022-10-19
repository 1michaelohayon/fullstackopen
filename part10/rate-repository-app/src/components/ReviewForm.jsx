import * as yup from 'yup'
import Text from "./Text";
import { View, Pressable, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: theme.colors.backgroundSecondry,
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
const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0, "number cna't be below 0")
    .max(100, "number can't be above 100")
    .required('Rating is required'),
  review: yup
    .string()
    .required('Review is required')
})



const ReviewForm = ({ getRepoBy }) => {
  const [createReview] = useCreateReview()
  const onSubmit = async values => {
    const { ownerName, repositoryName, review } = values;
    const rating = Number(values.rating)

    try {
      const data = await createReview({ ownerName, repositoryName, rating, text: review });
      console.log('review data', data);
      getRepoBy(data.createReview.repositoryId)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View>
      <Formik
        initialValues={{ ownerName: '', repositoryName: '', rating: '', review: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <ReviewFields onSubmit={handleSubmit} />}
      </Formik>
    </View>
  )


}
export default ReviewForm


const ReviewFields = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="ownerName"
        placeholder="Repository owner name"
        placeholderTextColor={theme.colors.textSecondary}
      />
      <FormikTextInput
        name="repositoryName"
        placeholder="Repository name"
        placeholderTextColor={theme.colors.textSecondary}
      />
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100"
        placeholderTextColor={theme.colors.textSecondary}
      />
      <FormikTextInput
        name="review"
        placeholder="Review"
        placeholderTextColor={theme.colors.textSecondary}
        multiline={true}
      />
      <Pressable onPress={onSubmit}>
        <View style={styles.button}>
          <Text color={theme.colors.textWhite} style={{ textAlign: 'center' }}>Create a review</Text>
        </View>
      </Pressable>

    </View>
  )
}