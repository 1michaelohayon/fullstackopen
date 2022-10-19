import * as yup from 'yup'
import Text from "./Text";
import { View, Pressable, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import theme from '../theme';

import useSignIn from '../hooks/useSignIn';


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
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
})


const SignIn = () => {
  const [signIn] = useSignIn();
  const onSubmit = async values => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      console.log('Data ', data);
    } catch (e) {
      console.log(e);
    }
  }



  return (
    <View>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  )


}

export default SignIn

export const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        placeholderTextColor={theme.colors.textSecondary}
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor={theme.colors.textSecondary}
      />
      <Pressable onPress={onSubmit}>
        <View style={styles.button}>
          <Text color={theme.colors.textWhite} style={{ textAlign: 'center' }}>Sign in</Text>
        </View>
      </Pressable>
    </View>
  )


} 