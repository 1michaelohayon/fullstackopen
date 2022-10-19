
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

const Greeting = ({ name }) => {
  return (
    <View>
      <Text>Hey {name}.</Text>
    </View>
  );
};

describe('Example', () => {
  it('works', () => {
    expect(1).toBe(1);
  });
});

describe('Greeting', () => {
  it('renders a greeting message based on the name prop', () => {
    const { debug, getByText } = render(<Greeting name="michael" />);

    debug();

    expect(getByText('Hey michael.')).toBeDefined();
  });
});