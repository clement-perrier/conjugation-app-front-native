import { View, Text, StyleSheet, FlatList, useWindowDimensions, TextInput } from 'react-native';
import { Button } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { Verbs } from '@/constants/Verbs';
import { addSelectedConjugationTable } from '@/state/slices/SelectedConjugationTableListSlice';
import { useEffect, useState } from 'react';
import IconButton from '@/components/IconButton';
import { Verb } from '@/types/Verb';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ConjugationTable } from '@/types/ConjugationTable';
import { ConjugationTables } from '@/constants/ConjugationTables';

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

  const removeSelectedVerb = (selectedVerb: Verb) => {
    setSelectedVerbList(selectedVerbList.filter(verb => verb.id !== selectedVerb.id))
  }
  

  const addSelectedVerb = (selectedVerb: Verb) => {
    setSelectedVerbList([
      ...selectedVerbList,
      selectedVerb
    ])
  }

  const getSelectedConjugationTableList = (): ConjugationTable[] => {
    let result: ConjugationTable[] = []
    selectedTense && selectedVerbList.forEach(verb => {
      const conjugationTable = ConjugationTables.find(table => table.tenseId === selectedTense.id && table.verbId === verb.id)
      conjugationTable &&
      result.push({
        id: conjugationTable.id,
        tense: selectedTense.name,
        verb: verb.name
      })
    })
    console.log(result)
    return result
  }

  // UI DATA, STATES
  const [numColumns, setNumColumns] = useState(calcNumColumns());

  const selectedTense = useAppSelector(state => state.selectedTense.value)

  const [searchedText, setSearchText] = useState('')

  const verbList: Verb[] = Verbs

  const [selectedVerbList, setSelectedVerbList] = useState<Verb[]>([])

  const unselectedVerbList = verbList.filter(verb => !selectedVerbList.some(selectedVerb => selectedVerb.id === verb.id))

  const filteredVerbList = textFilter(searchedText)

 

  // USE EFFECT
  useEffect(() => {
    setNumColumns(calcNumColumns());
  }, [screenWidth]);

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
          key={numColumns}
          renderItem={({item}) => 
            <View style={{position: 'relative'}}>
              <Button title={item.name + '    '} color='grey' onPress={() => removeSelectedVerb(item)}/>
              <MaterialIcons name='remove' size={20} color={'white'} style={{position: 'absolute', top: 8, right: 0, pointerEvents: 'none'}}/>
            </View>
          }
          numColumns={numColumns}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          columnWrapperStyle={numColumns > 1 && styles.columnWrapperStyle}
        >
        </FlatList>
      </View>

      {/* VERB LIST */}
      <View style={{flex: 1, width: '100%', marginBottom: 10}}>
        <FlatList 
          style={{height: 10}}
          ItemSeparatorComponent={() => <View style={{height: 15}} />}
          numColumns={numColumns}
          columnWrapperStyle={numColumns > 1 && styles.columnWrapperStyle}
          data={filteredVerbList}
          key={numColumns}
          renderItem={({item}) => 
            <View style={styles.buttonWidth}>
              <Button 
                title={item.name}
                onPress={() => addSelectedVerb(item)}
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
          onPress={() => {
            dispatch(addSelectedConjugationTable(getSelectedConjugationTableList()))
            navigation.navigate('Set summary')}
          }
          disabled={selectedVerbList.length === 0}
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
  },
  columnWrapperStyle: {
    justifyContent: 'space-evenly'
  }
});
