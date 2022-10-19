import * as yup from 'yup'
import Text from "./Text";
import { View, Pressable, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import theme from '../theme';
import useCreateUser from '../hooks/useCreateUser'
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';


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
    .min(0, "Username can't be below 1 charachters")
    .max(30, "Username can't be above 30 charachters")
    .required('Usernameis required'),
  password: yup
    .string()
    .min(5, "Password can't be below 5 charachters")
    .max(50, "Password can't be above 50 charachters")
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .min(5, "Password can't be below 5 charachters")
    .max(50, "Password can't be above 50 charachters")
    .required('Password confirmation is required'),

})



const SignUp = () => {
  const [createUser] = useCreateUser()
  const [signIn] = useSignIn()
  const navigate = useNavigate()
  const onSubmit = async values => {
    const { username, password, passwordConfirmation } = values;

    try {
      console.log(username, password, passwordConfirmation);

      if (password !== passwordConfirmation) { throw new Error("Password doesn't match") };

      await createUser({ username, password });
      await signIn({ username, password });

      navigate('/');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View>
      <Formik
        initialValues={{ username: '', password: '', passwordConfirmation: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}

      >
        {({ handleSubmit }) => <SignUpFields onSubmit={handleSubmit} />}
      </Formik>
    </View>
  )


}
export default SignUp


const SignUpFields = ({ onSubmit }) => {
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
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry={true}
        placeholderTextColor={theme.colors.textSecondary}
      />
      <Pressable onPress={onSubmit}>
        <View style={styles.button}>
          <Text color={theme.colors.textWhite} style={{ textAlign: 'center' }}>Sign Up</Text>
        </View>
      </Pressable>
    </View>
  )
}