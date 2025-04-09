import { View, StyleSheet, Text } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppSelector } from '@/state/hooks';
import MainLayout from '@/components/layout/MainLayout';
import { LayoutButton } from '@/types/LayoutButton';
import { globalstyles } from '@/utils/GlobalStyle';
import CustomFlatList from '@/components/layout/CustomFlatList';
import { formatBatchTitle } from '@/utils/Date';
import Colors from '@/constants/Colors';
import CustomProgressSteps from '@/components/CustomProgressSteps';
import Styles from '@/constants/Styles';
import React from 'react';

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

  return (
    <MainLayout buttons={buttons} title={formatBatchTitle(selectedBatch)}>
      <>
        <View style={{marginTop: Styles.mainPadding}}>
          <CustomProgressSteps currentStep={selectedBatch.dayNumber}/>
        </View>
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
    borderRadius: 5
  }
});
