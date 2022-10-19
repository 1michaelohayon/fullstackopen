/* eslint-disable no-unused-vars */
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';  
import theme from '../theme';

const styles = StyleSheet.create({
  inputBox: {
    fontSize: theme.fontSizes.subheading,
    padding: 17,
    margin: 10,
    borderRadius: theme.roundness,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary
  },
  errorInputBox: {
    fontSize: theme.fontSizes.subheading,
    padding: 17,
    margin: 10,
    borderRadius: theme.roundness,
    borderWidth: 1,
    borderColor: theme.colors.error
  },
});

const TextInput =({style, error, ...props}) => {
  const errorStyle = error ? styles.errorInputBox : styles.inputBox
  const textInputStyle = [style, errorStyle]

  return <NativeTextInput style={textInputStyle} {...props} />;
};


export default TextInput