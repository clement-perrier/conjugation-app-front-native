import { View, Text, FlatList, Button, StyleSheet, Pressable } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import IconButton from '@/components/buttons/IconButton';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { useEffect } from 'react';
import { FetchPronounList, FetchBatchList, FetchTableList, FetchTenseList, FetchVerbList } from '@/services/ApiService';
import { MaterialIcons } from '@expo/vector-icons';
import formatDate from '@/utils/FormatDate';
import { updateSelectedBatch } from '@/state/slices/SelectedBatchSlice';
import MainLayout from '@/components/layout/MainLayout';
import { LayoutButton } from '@/types/LayoutButton';

export default function Home() {

  const navigation = useAppNavigation()
  const dispatch = useAppDispatch();

  // Selectors
  const setList = useAppSelector(state => state.BatchList.value)

  useEffect(() => {
    // TENSES, VERBS, PRONOUNS, CONJUGATIONS(table shaped) and SETS dispatched to the store
    dispatch(FetchTenseList())
    dispatch(FetchVerbList())
    dispatch(FetchPronounList())
    dispatch(FetchTableList())
    dispatch(FetchBatchList())
  }, [])

  useEffect(()=> {
    console.log(setList)
  }, [setList])

  // Buttons
  const buttons: LayoutButton[] = [
    {
      onPress: () => navigation.navigate('Tense(s) selection'),
      icon: 'add'
    }
  ]

  return (

    <MainLayout buttons={buttons}>
      <FlatList
            data={setList}
            renderItem={({item}) => 
              <View style={styles.button}>
                <Button 
                  title={formatDate(item.reviewingDate) + ' - Day ' + item.dayNumber + '    '}
                  onPress={() =>{
                    dispatch(updateSelectedBatch(item))
                    navigation.navigate('Start')
                  }}
                />
                <MaterialIcons name='chevron-right' size={20} color={'white'} style={{position: 'absolute', top: 8, right: 2, pointerEvents: 'none'}}/>
              </View>
            }
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            >
          </FlatList>
    </MainLayout>
          
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%'
  }
});