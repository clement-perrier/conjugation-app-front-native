import { View, Text, Button} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types/RootStackParamList';

export default function Settings() {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings</Text>
        <Button
          title="Open Modal"
        />
      </View>
    </>
  );

}
