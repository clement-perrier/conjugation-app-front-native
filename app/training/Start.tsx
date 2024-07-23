import { View, StyleSheet, Text, Button, FlatList } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import TableList from '@/components/TableList';
import { useAppSelector } from '@/state/hooks';

export default function Start() {

  const navigation = useAppNavigation()

  // Selectors
  const selectedBatch = useAppSelector(state => state.SelectedBatch.value)

  // States

  // Derived data

  // Functions

  // Handlers

  return (
    <View style={styles.container}>

      <View style={{justifyContent: 'center', flex: 1}}>
      <View style={{justifyContent: 'center'}}>
        <FlatList
            data={selectedBatch?.tableList}
            renderItem={({item}) => 
              <View>
                <Text style={styles.table}>{item.verb.name + ' - ' + item.tense.name}</Text>
              </View>
            }
            ItemSeparatorComponent={() => <View style={{height: 20}} />}
            >
        </FlatList>
      </View>
      </View>

      <Button 
          title='START'
          onPress={() => navigation.navigate('Question')}
        />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  table: {
    backgroundColor: 'gray',
    padding: 15
  }
});
