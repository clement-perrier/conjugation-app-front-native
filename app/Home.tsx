import { View, Text } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import IconButton from '@/components/IconButton';
import { useAppDispatch } from '@/state/hooks';
import { useEffect } from 'react';
import { FetchPronounList, FetchTableList, FetchTenseList, FetchVerbList } from '@/services/ApiService';

export default function Home() {

  const navigation = useAppNavigation()

  const dispatch = useAppDispatch();

  useEffect(() => {
    // TENSES, VERBS, PRONOUNS and CONJUGATIONS(table shaped) dispatched to the store
    dispatch(FetchTenseList())
    dispatch(FetchVerbList())
    dispatch(FetchPronounList())
    dispatch(FetchTableList())
  }, [])

  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
      <IconButton size={40} color='white' icon={'add'} onPress={() => navigation.navigate('Tense(s) selection')} style={{backgroundColor: 'black', bottom: 40}}/>
    </View>
  );
}
