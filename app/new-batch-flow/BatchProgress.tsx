import MainLayout from '@/components/layout/MainLayout';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { updateSelectedBatch } from '@/state/slices/SelectedBatchSlice';
import { clearSelectedTableList, removeSelectedTable } from '@/state/slices/SelectedTableListSlice';
import { updateVerbList } from '@/state/slices/VerbListSlice';
import { LayoutButton } from '@/types/LayoutButton';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native';

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
      label: 'CREATE SET',
      onPress: () => {
        dispatch(updateSelectedBatch({
          dayNumber: 0,
          reviewingDate: new Date(),
          tableList: selectedTableList
        }))
        dispatch(clearSelectedTableList())
        navigation.navigate('Batch created')},
    },
    {
      label: 'ADD MORE',
      onPress: () => navigation.push('Tense(s) selection')
    }
  ]

  return (
    <MainLayout buttons={buttons}>
      <>
        {selectedTableList.length > 0 && 
          <FlatList
          data={selectedTableList}
          renderItem={({item}) => 
            <View style={{position: 'relative'}}>
              <Button 
                title={item.verb.name + ' - ' + item.tense.name + '      '} 
                onPress={() => {
                  dispatch(removeSelectedTable(item))
                  dispatch(updateVerbList(item.verb))
                }}
              />
              <MaterialIcons name='close' size={20} color={'white'} style={{position: 'absolute', top: 8, right: 2, pointerEvents: 'none'}}/>
            </View>
          }
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          >
          </FlatList>
        }
      </>
    </MainLayout>
  );
}

