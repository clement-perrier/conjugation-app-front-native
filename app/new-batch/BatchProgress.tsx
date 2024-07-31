import ListButton from '@/components/buttons/ListButton';
import MainLayout from '@/components/layout/MainLayout';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { updateSelectedBatch } from '@/state/slices/SelectedBatchSlice';
import { clearSelectedTableList, removeSelectedTable } from '@/state/slices/SelectedTableListSlice';
import { updateVerbList } from '@/state/slices/VerbListSlice';
import { LayoutButton } from '@/types/LayoutButton';
import { globalstyles } from '@/utils/GlobalStyle';
import { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

export default function BatchProgress() {

  const navigation = useAppNavigation();

  const dispatch = useAppDispatch();

  const selectedTableList = useAppSelector(state => state.selectedTableList.value)

  useEffect(() => {
    console.log(selectedTableList)
  },[selectedTableList])

  // Buttons
  const buttons: LayoutButton[] = [
    {
      label: 'ADD MORE',
      onPress: () => navigation.push('Tense(s) selection')
    },
    {
      label: 'CREATE SET',
      disabled: selectedTableList.length < 1,
      onPress: () => {
        dispatch(updateSelectedBatch({
          dayNumber: 0,
          reviewingDate: new Date().toISOString(),
          tableList: selectedTableList,
          language: {
            id: 1,
            name: 'Spanish'
          }
        }))
        dispatch(clearSelectedTableList())
        navigation.navigate('Batch created')},
    }
  ]

  return (
    <MainLayout buttons={buttons}>
      <>
        {selectedTableList.length > 0 ? 
          <FlatList
            style={globalstyles.flatList}
            contentContainerStyle={globalstyles.flatListContent}
            data={selectedTableList}
            renderItem={({item}) => 
                <ListButton
                  label={item.verb.name.toUpperCase() + ' - ' + item.tense.name.toUpperCase()} 
                  onPress={() => {
                    dispatch(removeSelectedTable(item))
                    dispatch(updateVerbList(item.verb))
                  }}
                  icon='close'
                />
            }
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            >
          </FlatList>
          : <Text style={globalstyles.text}>The current set is empy</Text>
        }
      </>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  
})
