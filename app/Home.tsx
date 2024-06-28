import { View, Text } from 'react-native';
import { Button } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import IconButton from '@/components/IconButton';

export default function Home() {


  const navigation = useAppNavigation()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
      <IconButton icon={'add'} onPress={() => navigation.navigate('Tense(s) selection')}/>
    </View>
  );
}
