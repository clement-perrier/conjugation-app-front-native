import { View, Text, StyleSheet, FlatList, useWindowDimensions, TextInput } from 'react-native';
import { Button } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { Verbs } from '@/constants/Verbs';
import { addSelectedVerb, removeSelectedVerb } from '@/state/slices/selectedVerbListSlice';
import { useState } from 'react';
import IconButton from '@/components/IconButton';
import { Verb } from '@/types/Verb';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function VerbSelection() {

  // HOOKS
  const navigation = useAppNavigation();

  const dispatch = useAppDispatch();

  const screenWidth = useWindowDimensions().width;

  // FUNCTIONS
  const calcNumColumns = () => Math.floor(screenWidth / (styles.buttonWidth.width + styles.selectedVerb.marginHorizontal))
  
  const textFilter = (text: string) => {
    return unselectedVerbList.filter(verb => verb.name.includes(text))
  }

  // UI DATA, STATES
  const selectedTense = useAppSelector(state => state.selectedTense.value)

  const [searchedText, setSearchText] = useState('')

  const verbList: Verb[] = Verbs

  const selectedVerbList = useAppSelector(state => state.selectedVerbList.value)

  const unselectedVerbList = verbList.filter(verb => !selectedVerbList.some(selectedVerb => selectedVerb.id === verb.id))

  const filteredVerbList = textFilter(searchedText)

  return (
    <View style={styles.container}>

      {/* SELECTED TENSE */}
      { selectedTense && <Text>{selectedTense.name}</Text> }

      {/* SEARCH INPUT */}
      <View>
        <IconButton style={styles.searchButton} size={25} color='black' icon={'search'}/>
        
        {searchedText ?
            <IconButton style={styles.clearButton} size={25} color='black' icon={'clear'} onPress={() => setSearchText('')}/>
            :
            <></>
        }
        <TextInput
          style={styles.input}
          onChangeText={setSearchText}
          value={searchedText}
          placeholder="search verb"
          inlineImageLeft='react-logo'
          />
        </View>

      {/* SELECTED VERB LIST */}  
      <View style={{width: '100%', marginBottom: 10}}>
        <FlatList
          data={selectedVerbList}
          renderItem={({item}) => 
            <View style={{position: 'relative'}}>
              <Button title={item.name + '    '} color='grey' onPress={() => dispatch(removeSelectedVerb(item))}/>
              <MaterialIcons name='remove' size={20} color={'white'} style={{position: 'absolute', top: 8, right: 0, pointerEvents: 'none'}}/>
              {/* <IconButton 
                size={20} 
                color={'black'} 
                style={[styles.removeButton]} 
                icon={'remove'} 
                onPress={() => dispatch(removeSelectedVerb(item))}>
              </IconButton>
              <Text style={[styles.selectedVerb, styles.buttonWidth]} key={item.id}>{item.name}</Text> */}
            </View>
          }
          numColumns={calcNumColumns()}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          columnWrapperStyle={{
            justifyContent: 'space-evenly'
          }}
        >
        </FlatList>
      </View>

      {/* VERB LIST */}
      <View style={{flex: 1, width: '100%', marginBottom: 10}}>
        <FlatList 
          style={{height: 10}}
          ItemSeparatorComponent={() => <View style={{height: 15}} />}
          numColumns={calcNumColumns()}
          columnWrapperStyle={{
            justifyContent: 'space-evenly'
          }}
          data={filteredVerbList}
          renderItem={({item}) => 
            <View style={styles.buttonWidth}>
              <Button 
                title={item.name}
                onPress={() => dispatch(addSelectedVerb(item))}
              ></Button>
            </View>
            }
          >
        </FlatList>
      </View>

      {/* END BUTTON */}
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
  buttonWidth: {
    width: 120,
  },
  selectedVerb: {
    backgroundColor: 'gray',
    marginHorizontal: 5
  },
  removeButton: {
    position: 'absolute',
    backgroundColor: 'gray',
    top: 0,                   
    right: 6,
    width: 30,
    height: '100%',
    zIndex: 1
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    paddingVertical: 10,
    paddingLeft: 35,
    paddingRight: 20
  },
  searchButton: {
    position: 'absolute',
    top: 20,
    left: 20
  },
  clearButton: {
    position: 'absolute',
    top: 20,
    right: 20
  }
});
