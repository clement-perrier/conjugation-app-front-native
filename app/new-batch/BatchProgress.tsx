import ListButton from '@/components/buttons/ListButton';
import MainLayout from '@/components/layout/MainLayout';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { SaveBatch } from '@/services/ApiService';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { addBatch } from '@/state/slices/BatchListSlice';
import { updateSelectedBatch } from '@/state/slices/SelectedBatchSlice';
import { clearSelectedTableList, removeSelectedTable } from '@/state/slices/SelectedTableListSlice';
import { Batch } from '@/types/Batch';
import { LayoutButton } from '@/types/LayoutButton';
import { UserLearningLanguage } from '@/types/UserLearningLanguage';
import { globalstyles } from '@/utils/GlobalStyle';
import { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

export default function BatchProgress() {

  const navigation = useAppNavigation();

  const dispatch = useAppDispatch();

  const selectedTableList = useAppSelector(state => state.selectedTableList.value)
  const batchList = useAppSelector(state => state.BatchList.value)
  const user = useAppSelector(state => state.User.value)

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

        const userLearningLanguage: UserLearningLanguage = {
          userId: user.id, 
          learningLanguageId: user.defaultLearningLanguage.id
        }

        // New batch object
        const newBatch: Batch = {
          dayNumber: 0,
          reviewingDate: new Date().toISOString(),
          tableList: selectedTableList,
          userLearningLanguage
        }

        // Save new Batch in database
        SaveBatch(newBatch)

        // Optimistics update => redux add new batch to batch list
        newBatch.id = batchList.length
        dispatch(addBatch(newBatch))

        // Update selected batch with this one
        dispatch(updateSelectedBatch(newBatch))

        // Selection ended, clearing the selection
        dispatch(clearSelectedTableList())

        // Navigation to next page
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
