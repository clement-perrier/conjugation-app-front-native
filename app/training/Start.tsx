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

export default function Start() {

  const navigation = useAppNavigation()

  const dispatch = useAppDispatch()

  // Selectors
  const selectedBatch = useAppSelector(state => state.SelectedBatch.value)

  // States

  // Derived data

  // Effects

  // Functions

  // Handlers

  // Buttons
  // let altBool = true
  const buttons: LayoutButton[] = [
    {
      label: 'START',
      disabled: new Date(selectedBatch.reviewingDate) > new Date(),
      onPress: () => {
        navigation.navigate('Question')
      }
    }
  ]

  return (
    <MainLayout buttons={buttons} title={formatBatchTitle(selectedBatch)}>

      <CustomFlatList
        data={selectedBatch?.tableList}
        renderItem={({item}) => 
            <Text style={[styles.table, globalstyles.text]}>{item.verb.name.toUpperCase() + ' - ' + item.tense.name.toUpperCase()}</Text>
        }
      >
      </CustomFlatList>

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
