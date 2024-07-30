import { View, StyleSheet, Text, FlatList } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import MainLayout from '@/components/layout/MainLayout';
import { LayoutButton } from '@/types/LayoutButton';
import { globalstyles } from '@/utils/GlobalStyle';
import { useEffect } from 'react';
import addDays from '@/utils/AddDays';
import { addBatch } from '@/state/slices/BatchListSlice';
import { updateSelectedBatch } from '@/state/slices/SelectedBatchSlice';
import { Batch } from '@/types/Batch';

export default function Start() {

  const navigation = useAppNavigation()

  const dispatch = useAppDispatch()

  // Selectors
  const selectedBatch = useAppSelector(state => state.SelectedBatch.value)

  // States

  // Derived data

  // Effects
  // useEffect(() => {
  //   if(selectedBatch)
  //   console.log(addDays(selectedBatch.reviewingDate, 1))
  //   selectedBatch && 
  //   dispatch(addBatch({
  //     dayNumber: 7,
  //     reviewingDate: addDays(selectedBatch.reviewingDate, 1),
  //     tableList: selectedBatch.tableList
  //   }))
  // },[selectedBatch])

  // Functions

  // Handlers

  // Buttons
  let altBool = false
  const buttons: LayoutButton[] = [
    {
      label: 'START',
      onPress: () => {
        // const newSelectedBatch: Batch = JSON.parse(JSON.stringify(selectedBatch));
        // newSelectedBatch.tableList?.map(table => {
        //       altBool = !altBool
        //       table.conjugationList?.map(conjugation => {
        //         conjugation.correct = altBool
        //       })})
        // dispatch(updateSelectedBatch(newSelectedBatch))
        // navigation.navigate('Results')
        navigation.navigate('Question')
      }
    }
  ]

  return (
    <MainLayout buttons={buttons}>
      <FlatList
          style={globalstyles.flatList}
          contentContainerStyle={globalstyles.flatListContent}
          data={selectedBatch?.tableList}
          renderItem={({item}) => 
              <Text style={[styles.table, globalstyles.text]}>{item.verb.name.toUpperCase() + ' - ' + item.tense.name.toUpperCase()}</Text>
          }
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
          >
      </FlatList>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  table: {
    backgroundColor: 'gray',
    padding: 15
  }
});
