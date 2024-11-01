import ListButton from '@/components/buttons/ListButton';
import CustomFlatList from '@/components/layout/CustomFlatList';
import MainLayout from '@/components/layout/MainLayout';
import Spinner from '@/components/layout/Spinner';
import { SET_NUMBER_LIMIT } from '@/constants/Configuration';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { SaveBatch } from '@/services/ApiService';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { addBatch } from '@/state/slices/BatchListSlice';
import { updateSelectedBatch } from '@/state/slices/SelectedBatchSlice';
import { clearSelectedTableList, removeSelectedTable } from '@/state/slices/SelectedTableListSlice';
import { Batch } from '@/types/Batch';
import { LayoutButton } from '@/types/LayoutButton';
import { UserLearningLanguage } from '@/types/UserLearningLanguage';
import { formatDateAsISO } from '@/utils/Date';
import { globalstyles } from '@/utils/GlobalStyle';
import { handleSuccess } from '@/utils/Messages';
import { useEffect, useState } from 'react';
import { Text, StyleSheet, BackHandler } from 'react-native';

export default function BatchProgress() {

  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)

  // Selectors
  const selectedTableList = useAppSelector(state => state.selectedTableList.value)
  const user = useAppSelector(state => state.User.value)

  //  Derived data
  const isSetLimitReached = selectedTableList.length >= SET_NUMBER_LIMIT

  // Handle functions
  const handleCreateSet = async () => {
    if (user){

      const userLearningLanguage: UserLearningLanguage = {
        userId: user.id, 
        learningLanguageId: user.defaultLearningLanguage.id
      }

      // New batch object
      const newBatch: Batch = {
        dayNumber: 0,
        reviewingDate: formatDateAsISO(new Date()),
        tableList: selectedTableList,
        userLearningLanguage
      }

      setLoading(true)

      // Save new Batch in database
      const savedBatch = await SaveBatch(newBatch)

      if(savedBatch) {
        // newBatch.id = batchList.length
        dispatch(addBatch(savedBatch))
        // Update selected batch with this one
        dispatch(updateSelectedBatch(savedBatch))
        handleSuccess('Set created')
      }
      
      setLoading(false)

    }

    // Selection ended, clearing the selection
    dispatch(clearSelectedTableList())

    // Navigation to next page
    navigation.navigate('Batch created')
  }

  // States
  const [loading, setLoading] = useState(false)

  // Effects
  useEffect(() => {
    
    return () => backHandler.remove()
  }, [])

  // Buttons
  const buttons: LayoutButton[] = [
    {
      label: 'ADD MORE',
      onPress: () => {
        backHandler.remove()
        navigation.push('Tense(s) selection')
      },
      disabled: isSetLimitReached
    },
    {
      label: 'CREATE SET',
      disabled: selectedTableList.length < 1,
      onPress: () => {
        backHandler.remove()
        handleCreateSet()
      }
    }
  ]

  if(loading) {
    return <Spinner text={'Creation'}/>
  }

  return (
    <MainLayout buttons={buttons} title='your set'>
      
      <>

        <CustomFlatList
          isLoading={false}
          emptyMessage='Selection is empty'
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
        >
        </CustomFlatList>

        { isSetLimitReached && <Text style={globalstyles.text}>Set limit reached</Text>}

      </>

    </MainLayout>
  );
}

const styles = StyleSheet.create({
  
})
