import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { removeSelectedConjugationTable } from '@/state/slices/SelectedConjugationTableListSlice';
import { updateVerbList } from '@/state/slices/VerbListSlice';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native';

export default function SetSummary() {

  const navigation = useAppNavigation();

  const dispatch = useAppDispatch();

  const selectedConjugationTableList = useAppSelector(state => state.selectedConjugationTableList.value)

  useEffect(() => {
  },[])

  return (
    <View style={styles.container}>
      <Text>Set Summary</Text>
      {selectedConjugationTableList.length > 0 && 
        <FlatList
        data={selectedConjugationTableList}
        renderItem={({item}) => 
          <View style={{position: 'relative'}}>
            <Button 
              title={item.verb.name + ' - ' + item.tense.name + '      '} 
              onPress={() => {
                dispatch(removeSelectedConjugationTable(item))
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
