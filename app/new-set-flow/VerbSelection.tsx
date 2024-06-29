import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Button } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppSelector } from '@/state/hooks';
import { Verbs } from '@/constants/Verbs';

export default function VerbSelection() {

  const navigation = useAppNavigation();

  const selectedTense = useAppSelector(state => state.selectedTense.value)

  const verbList = Verbs.map(verb => 
    <View key={verb.id} style={styles.button}>
      <Button title={verb.name}></Button>
    </View>
  )

  return (
    <View style={styles.container}>
      { selectedTense && <Text>{selectedTense.name}</Text> }
      <FlatList 
        contentContainerStyle={{
          marginHorizontal: '10%',
          // alignItems: "stretch",
          // width: '100%'
        }}
        ItemSeparatorComponent={() => <View style={{height: 20}} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          alignContent: 'center',
          width: '100%'
        }}
        data={Verbs}
        renderItem={({item}) => <Button title={item.name}></Button>}
        >
      </FlatList>
      <Button 
        title='ADD TO SET'
        onPress={() => navigation.navigate('Set summary')}
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
  button: {
    marginBottom: 20,
    width: 250
  }
});
