import { View, StyleSheet, Text, _View } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppSelector } from '@/state/hooks';
import MainLayout from '@/components/layout/MainLayout';
import { LayoutButton } from '@/types/LayoutButton';
import { globalstyles } from '@/utils/GlobalStyle';
import CustomFlatList from '@/components/layout/CustomFlatList';
import { formatBatchTitle } from '@/utils/Date';
import Colors from '@/constants/Colors';
import CustomProgressSteps from '@/components/CustomProgressSteps';
import React from 'react';
import * as DateService from '@/utils/Date';

export default function Start() {

  const navigation = useAppNavigation()

  // Selectors
  const selectedBatch = useAppSelector(state => state.SelectedBatch.value)

  // States

  // Derived data
  // const isDueToday: boolean = localDate.getTime() <= today.getTime()
  const isDueToday: boolean = DateService.isDueToday(selectedBatch.reviewingDate)

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
        <View style={{marginTop: 40}}>
          <CustomProgressSteps currentStep={selectedBatch.dayNumber}/>
        </View>
        <CustomFlatList
          data={selectedBatch?.tableList}
          itemSeparatorHeight={15}
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
    backgroundColor: Colors.tertiary,
    padding: 15,
    borderRadius: 8
  }
});
