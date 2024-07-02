import { View, Text } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import IconButton from '@/components/IconButton';

export default function Home() {


  const navigation = useAppNavigation()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
      <IconButton size={40} color='white' icon={'add'} onPress={() => navigation.navigate('Tense(s) selection')} style={{backgroundColor: 'black', bottom: 40}}/>
    </View>
  );
}
