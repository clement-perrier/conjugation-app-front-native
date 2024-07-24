import { View, StyleSheet, Text, Button, FlatList } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import TableList from '@/components/TableList';
import { useAppSelector } from '@/state/hooks';
import MainLayout from '@/components/layout/MainLayout';
import { LayoutButton } from '@/types/LayoutButton';

export default function Start() {

  const navigation = useAppNavigation()

  // Selectors
  const selectedBatch = useAppSelector(state => state.SelectedBatch.value)

  // States

  // Derived data

  // Functions

  // Handlers

  // Buttons
  const buttons: LayoutButton[] = [
    {
      label: 'START',
      onPress: () => navigation.navigate('Question')
    }
  ]

  return (
    <MainLayout buttons={buttons}>
      <>
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
      </>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  table: {
    backgroundColor: 'gray',
    padding: 15
  }
});
