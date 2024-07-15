import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { updateSelectedSet } from '@/state/slices/SelectedSetSlice';
import { clearSelectedTableList, removeSelectedTable } from '@/state/slices/SelectedTableListSlice';
import { addSet } from '@/state/slices/SetListSlice';
import { updateVerbList } from '@/state/slices/VerbListSlice';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native';

export default function SetProgress() {

  const navigation = useAppNavigation();

  const dispatch = useAppDispatch();

  const selectedTableList = useAppSelector(state => state.selectedTableList.value)

  return (
    <View style={styles.container}>
      <Text>Set progress</Text>
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
      <Button 
        title='ADD MORE'
        onPress={() => navigation.push('Tense(s) selection')}
      />
      <Button 
        title='CREATE SET'
        onPress={() => {
          dispatch(updateSelectedSet({
            day: 0,
            // dueDate: '45',
            tableList: selectedTableList
          }))
          dispatch(clearSelectedTableList())
          navigation.navigate('Set summary')}
        }
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
