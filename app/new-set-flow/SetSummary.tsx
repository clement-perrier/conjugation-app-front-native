import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { removeSelectedConjugationTable } from '@/state/slices/selectedConjugationTableListSlice';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native';
import { shallowEqual } from 'react-redux';

export default function SetSummary() {

  const navigation = useAppNavigation();

  const dispatch = useAppDispatch();

  const selectedConjugationTableList = useAppSelector(state => state.selectedConjugationTableList.value)

  console.log(selectedConjugationTableList)
  console.log(selectedConjugationTableList[0], selectedConjugationTableList[0].verb)

  useEffect(() => {
  },[])

  return (
    <View style={styles.container}>
      <Text>Set Summary {selectedConjugationTableList[0].tense}</Text>
      {selectedConjugationTableList && 
        <FlatList
        data={selectedConjugationTableList}
        renderItem={({item}) => 
          <View style={{position: 'relative'}}>
            <Button title={item.verb + ' - ' + item.tense + '      '} onPress={() => dispatch(removeSelectedConjugationTable(item))}/>
            <MaterialIcons name='close' size={20} color={'white'} style={{position: 'absolute', top: 8, right: 2, pointerEvents: 'none'}}/>
          </View>
        }
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        >
        </FlatList>
      }
      <Button 
        title='ADD MORE'
        onPress={() => navigation.push('Tense(s) selection')}
      />
      <Button 
        title='CREATE SET'
        onPress={() => navigation.navigate('Verb(s) selection')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
