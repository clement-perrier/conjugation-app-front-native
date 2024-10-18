import { View, StyleSheet, Text, FlatList } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import MainLayout from '@/components/layout/MainLayout';
import { LayoutButton } from '@/types/LayoutButton';
import { globalstyles } from '@/utils/GlobalStyle';
import { Batch } from '@/types/Batch';
import { updateSelectedBatch } from '@/state/slices/SelectedBatchSlice';
import CustomFlatList from '@/components/layout/CustomFlatList';
import { formatBatchTitle } from '@/utils/Date';
import Colors from '@/constants/Colors';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import CustomProgressSteps from '@/components/CustomProgressSteps';

export default function Start() {

  const navigation = useAppNavigation()

  // Selectors
  const selectedBatch = useAppSelector(state => state.SelectedBatch.value)

  // States

  // Derived data
  const isDueToday: boolean = new Date(selectedBatch.reviewingDate) <= new Date()

  
  // Effects

  // Functions

  // Handlers

  // Buttons
  // let altBool = true
  const buttons: LayoutButton[] = [
    {
      label: 'START',
      disabled: !isDueToday,
      onPress: () => {
        navigation.navigate('Question')
      },
      topMessage: !isDueToday ? 'This set is not due today' : ''
    }
  ]

  const progressStepsStyle = {
    stepIndicatorSize: 20,  // Adjust size
    currentStepIndicatorSize: 25,
    labelContainer: {
      width: 60, // Adjust width if necessary
    },
  }

  return (
    <MainLayout buttons={buttons} title={formatBatchTitle(selectedBatch)}>
      <>
      <CustomProgressSteps currentStep={selectedBatch.dayNumber}/>

        <CustomFlatList
          data={selectedBatch?.tableList}
          renderItem={({item}) => 
              <Text style={[styles.table, globalstyles.text]}>{item.verb.name.toUpperCase() + ' - ' + item.tense.name.toUpperCase()}</Text>
          }
        >
        </CustomFlatList>
      </>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  table: {
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 4
  }
});
