import { View, StyleSheet, Text, FlatList } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppSelector } from '@/state/hooks';
import MainLayout from '@/components/layout/MainLayout';
import { LayoutButton } from '@/types/LayoutButton';
import { globalstyles } from '@/utils/GlobalStyle';

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
      <FlatList
          style={globalstyles.flatList}
          contentContainerStyle={globalstyles.flatListContent}
          data={selectedBatch?.tableList}
          renderItem={({item}) => 
              <Text style={[styles.table, globalstyles.text]}>{item.verb.name.toUpperCase() + ' - ' + item.tense.name.toUpperCase()}</Text>
          }
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
          >
      </FlatList>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  table: {
    backgroundColor: 'gray',
    padding: 15
  }
});
