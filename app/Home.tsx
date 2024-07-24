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
import ListButton from '@/components/buttons/ListButton';

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
      icon: 'add',
      iconOnly: true
    }
  ]

  return (

    <MainLayout buttons={buttons}>
      <FlatList
            style={{height: 10, width: '100%'}}
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
            data={setList}
            renderItem={({item}) => 
                <ListButton 
                  label={formatDate(item.reviewingDate) + ' - Day ' + item.dayNumber + '    '}
                  onPress={() =>{
                    dispatch(updateSelectedBatch(item))
                    navigation.navigate('Start')
                  }}
                  icon='chevron-right'
                />
                // <MaterialIcons name='chevron-right' size={20} color={'white'} style={{position: 'absolute', top: 8, right: 2, pointerEvents: 'none'}}/>
            }
            ItemSeparatorComponent={() => <View style={{height: 20}} />}
            >
          </FlatList>
    </MainLayout>
          
  );
}

const styles = StyleSheet.create({

});