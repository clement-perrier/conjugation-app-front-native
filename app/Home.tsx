import { View, Text } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import IconButton from '@/components/IconButton';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { useEffect } from 'react';
import { FetchTenseList } from '@/services/ApiService';
import { store } from '@/state/store';

export default function Home() {

  const navigation = useAppNavigation()

  const dispatch = useAppDispatch();

  useEffect(() => {
    // TENSE LIST DISPATCHED TO STORE 
    dispatch(FetchTenseList())
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
      <IconButton size={40} color='white' icon={'add'} onPress={() => navigation.navigate('Tense(s) selection')} style={{backgroundColor: 'black', bottom: 40}}/>
    </View>
  );
}
