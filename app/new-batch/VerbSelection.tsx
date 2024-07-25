import { View, Text, StyleSheet, FlatList, useWindowDimensions, TextInput, Button } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { addSelectedTable } from '@/state/slices/SelectedTableListSlice';
import { useEffect, useState } from 'react';
import IconButton from '@/components/buttons/IconButton';
import { Verb } from '@/types/Verb';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Table } from '@/types/Table';
import { updateVerbList } from '@/state/slices/VerbListSlice';
import MainLayout from '@/components/layout/MainLayout';
import { LayoutButton } from '@/types/LayoutButton';
import ListButton from '@/components/buttons/ListButton';
import { globalstyles } from '@/utils/GlobalStyle';

export default function VerbSelection() {

  // HOOKS
  const navigation = useAppNavigation();

  const dispatch = useAppDispatch();

  const screenWidth = useWindowDimensions().width;

  // FUNCTIONS
  const calcNumColumns = () => Math.floor(screenWidth / (styles.buttonWidth.width + styles.selectedVerb.marginHorizontal + 10))
  
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

  const getSelectedConjugationTableList = () : Table[] => {
    let result: Table[] = [];
    if (selectedTense && selectedVerbList && tableList) {
      selectedVerbList.forEach(verb => {
        const foundTable = tableList.find(table => table.tense.id === selectedTense.id && table.verb.id === verb.id);
        if (foundTable) {
          result.push(foundTable);
        } else {
          console.warn(`Table not found for tense ID ${selectedTense.id} and verb ID ${verb.id}`);
        }
      });
    } else {
      console.error('selectedTense, selectedVerbList, or tableList is undefined or null');
    }
    console.log(result)
    return result
  }

  // UI DATA, STATES
  const [numColumns, setNumColumns] = useState(calcNumColumns());

  const selectedTense = useAppSelector(state => state.selectedTense.value)

  const [searchedText, setSearchText] = useState('')

  const verbList = useAppSelector(state => state.verbList.value)

  const [selectedVerbList, setSelectedVerbList] = useState<Verb[]>([])

  const unselectedVerbList = verbList && verbList.filter(verb => !selectedVerbList.some(selectedVerb => selectedVerb.id === verb.id))

  const filteredVerbList = textFilter(searchedText)

  const tableList: Table[] = useAppSelector(state => state.TableList.value)

  // USE EFFECT
  useEffect(() => {
    setNumColumns(calcNumColumns());
  }, [screenWidth]);

  // Buttons
  const buttons: LayoutButton[] = [
    {
      label: 'ADD TO SET',
      onPress: () => {
        selectedVerbList.forEach(verb => dispatch(updateVerbList(verb)))
        dispatch(addSelectedTable(getSelectedConjugationTableList()))
        navigation.navigate('Batch progress')
      },
      disabled: selectedVerbList.length === 0
    }
  ]

  return (
    <MainLayout buttons={buttons} contentCentered={false}>
      <>

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
        <View style={{flex: 1, marginBottom: 10}}>
          <FlatList 
            style={globalstyles.flatList}
            contentContainerStyle={globalstyles.flatListContent}
            ItemSeparatorComponent={() => <View style={{height: 15}} />}
            numColumns={numColumns}
            columnWrapperStyle={numColumns > 1 && styles.columnWrapperStyle}
            data={filteredVerbList}
            key={numColumns}
            renderItem={({item}) => 
              <View style={styles.buttonWidth}>
                <ListButton
                  label={item.name}
                  onPress={() => addSelectedVerb(item)}
                  disabled={item.selected}
                />
              </View>
              }
            >
          </FlatList>
        </View>

        {/* END BUTTON */}
        {/* <View>
            <Button 
            title='ADD TO SET'
            onPress={() => {
              selectedVerbList.forEach(verb => dispatch(updateVerbList(verb)))
              dispatch(addSelectedTable(getSelectedConjugationTableList()))
              navigation.navigate('Batch progress')}
            }
            disabled={selectedVerbList.length === 0}
            />
        </View> */}
        </>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  buttonWidth: {
    width: 120,
    marginLeft: 3,
    marginRight: 3
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
