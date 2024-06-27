import { View, Text } from 'react-native';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {

  // const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
    </View>
  );
}
