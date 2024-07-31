import { View, FlatList, StyleSheet } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { useEffect, useMemo } from 'react';
import { FetchPronounList, FetchBatchList, FetchTableList, FetchTenseList, FetchVerbList } from '@/services/ApiService';
import { formatDateAsLong } from '@/utils/Date';
import { updateSelectedBatch } from '@/state/slices/SelectedBatchSlice';
import MainLayout from '@/components/layout/MainLayout';
import { LayoutButton } from '@/types/LayoutButton';
import ListButton from '@/components/buttons/ListButton';
import { globalstyles } from '@/utils/GlobalStyle';
import { updateBatchInfo } from '@/state/slices/BatchListSlice';

export default function Home() {

  const navigation = useAppNavigation()
  const dispatch = useAppDispatch();

  // Selectors
  const batchList = useAppSelector(state => state.BatchList.value)

  const sortedBatchList = batchList.slice().sort((a, b) => new Date(a.reviewingDate).valueOf() - new Date(b.reviewingDate).valueOf())

  useEffect(() => {
    // TENSES, VERBS, PRONOUNS, CONJUGATIONS(table shaped) and SETS dispatched to the store
    dispatch(FetchTenseList())
    dispatch(FetchVerbList())
    dispatch(FetchPronounList())
    dispatch(FetchTableList())
    dispatch(FetchBatchList())
  }, [])

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
            style={globalstyles.flatList}
            contentContainerStyle={globalstyles.flatListContent}
            data={sortedBatchList}
            renderItem={({item}) => 
                <ListButton 
                  label={formatDateAsLong(item.reviewingDate) + ' - Day ' + item.dayNumber + '    '}
                  onPress={() =>{
                    dispatch(updateSelectedBatch(item))
                    navigation.navigate('Start')
                  }}
                  icon='chevron-right'
                />
            }
            ItemSeparatorComponent={() => <View style={{height: 20}} />}
            >
          </FlatList>
    </MainLayout>
          
  );
}

const styles = StyleSheet.create({

});