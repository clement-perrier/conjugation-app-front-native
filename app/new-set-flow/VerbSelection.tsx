import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Button } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { Verbs } from '@/constants/Verbs';
import { addVerb } from '@/state/slices/selectedVerbSlice';

export default function VerbSelection() {

  const navigation = useAppNavigation();

  const dispatch = useAppDispatch();

  const selectedTense = useAppSelector(state => state.selectedTense.value)

  const selectedVerbList = useAppSelector(state => state.selectedVerbList.value);

  let max = 0;
  let maxVerb = '';
  Verbs.forEach(verb => {
    if(verb.name.length >= max) {
      max = verb.name.length;
      maxVerb = verb.name
    } 
  })

  console.log(maxVerb);

  const verbList = Verbs.map(verb => 
    <View key={verb.id} style={styles.button}>
      <Button title={verb.name}></Button>
    </View>
  )
  const selectedVerbListE = selectedVerbList && selectedVerbList.map(verb => 
    <View key={verb.id} style={styles.button}>
      <Button title={verb.name}></Button>
    </View>
  )

  return (
    <View style={styles.container}>

      { selectedTense && <Text>{selectedTense.name}</Text> }

      {/* {selectedVerbListE && selectedVerbListE}
        <FlatList
          data={selectedVerbList}
          renderItem={({item}) => 
          <Text>{item.name}</Text>
            }
        >
        </FlatList> */}

      <View style={{flex: 1, width: '100%'}}>
        <FlatList 
          style={{height: 10}}
          contentContainerStyle={{
            marginHorizontal: '10%',
            // alignItems: "stretch",
            // width: '100%'
          }}
          ItemSeparatorComponent={() => <View style={{height: 15}} />}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: 'space-around',
            // alignContent: 'center',
            // width: '100%',
          }}
          data={Verbs}
          renderItem={({item}) => 
            <View style={{width: 120}}>
              <Button 
                title={item.name}
                onPress={() => {dispatch(addVerb(item)), console.log(item.name)}}
              ></Button>
            </View>
            }
          >
        </FlatList>
      </View>

      <View>
        <Button 
          title='ADD TO SET'
          onPress={() => navigation.navigate('Set summary')}
          />
      </View>

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
