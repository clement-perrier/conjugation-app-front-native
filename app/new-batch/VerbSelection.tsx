import { View, Text, StyleSheet, FlatList, useWindowDimensions, TextInput, Button } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { addSelectedTable } from '@/state/slices/SelectedTableListSlice';
import { useEffect, useState } from 'react';
import IconButton from '@/components/buttons/IconButton';
import { Verb } from '@/types/Verb';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Table } from '@/types/Table';
import MainLayout from '@/components/layout/MainLayout';
import { LayoutButton } from '@/types/LayoutButton';
import ListButton from '@/components/buttons/ListButton';
import { globalstyles } from '@/utils/GlobalStyle';
import CustomFlatList from '@/components/layout/CustomFlatList';
import { updateSelectableVerbs } from '@/state/slices/VerbListSlice';

export default function VerbSelection() {

  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const screenWidth = useWindowDimensions().width;


  // Selectors
  const selectedTableList = useAppSelector(state => state.selectedTableList.value)
  const selectedTense = useAppSelector(state => state.selectedTense.value)
  const tableList: Table[] = useAppSelector(state => state.TableList.value)
  const verbList = useAppSelector(state => state.verbList.value)
  const verbListLoading = useAppSelector(state => state.verbList.loading)
  const batchList = useAppSelector(state => state.BatchList.value)

  // Functions
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
    return result
  }

  // States
  const [numColumns, setNumColumns] = useState(calcNumColumns());
  const [searchedText, setSearchText] = useState('')
  const [selectedVerbList, setSelectedVerbList] = useState<Verb[]>([])
  
  // Derived data
  const unselectedVerbList = verbList && verbList.filter(verb => !selectedVerbList.some(selectedVerb => selectedVerb.id === verb.id))
  const filteredVerbList = textFilter(searchedText.toLowerCase())
  const allTableList = batchList.flatMap(batch => batch.tableList).concat(selectedTableList)

  // Effects
  useEffect(() => {
    setNumColumns(calcNumColumns());
  }, [screenWidth]);

  // Buttons
  const buttons: LayoutButton[] = [
    {
      label: 'ADD TO SET',
      onPress: () => {
        dispatch(addSelectedTable(getSelectedConjugationTableList()))
        navigation.navigate('Batch progress')
      },
      disabled: selectedVerbList.length === 0
    }
  ]

  return (
    
    <MainLayout buttons={buttons}>

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
            inlineImageLeft='react_logo'
            />
            
        </View>

        <View style={{flex: 1}}>

          {/* SELECTED VERB LIST */}  
          <View style={{width: '100%', marginBottom: 10, height: 'auto'}}>
            <CustomFlatList
              data={selectedVerbList}
              isLoading={false}
              emptyMessage='No verb selected yets'
              // key={numColumns}
              renderItem={({item}) => 
                <View style={{position: 'relative'}}>
                  <Button title={item.name + '    '} color='grey' onPress={() => removeSelectedVerb(item)}/>
                  <MaterialIcons name='remove' size={20} color={'white'} style={{position: 'absolute', top: 8, right: 0, pointerEvents: 'none'}}/>
                </View>
              }
              numColumns={numColumns}
              itemSeparatorHeight={10}
              columnWrapperStyle={numColumns > 1 && styles.columnWrapperStyle}
              style={{height: 'auto'}}
            >

            </CustomFlatList>
            {/* <FlatList
              data={selectedVerbList}
              // key={numColumns}
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
            </FlatList> */}
          </View>

          {/* VERB LIST */}
          <View style={{flex: 1, marginBottom: 10}}>

            <CustomFlatList
              data={filteredVerbList}
              isLoading={verbListLoading}
              emptyMessage='No verbs found'
              numColumns={numColumns}
              key={numColumns}
              itemSeparatorHeight={15}
              columnWrapperStyle={numColumns > 1 && styles.columnWrapperStyle}
              // style={[{flex: 1}, globalstyles.flatList]}
              renderItem={({item}) => 
                <View style={styles.buttonWidth}>
                  <ListButton
                    label={item.name}
                    onPress={() => addSelectedVerb(item)}
                    disabled={allTableList.some(table => table.tense.id === selectedTense?.id && table.verb.id === item.id)}
                  />
                </View>
                }
            >
            </CustomFlatList>
          </View>

        </View>
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
    paddingRight: 100
  },
  searchButton: {
    position: 'absolute',
    top: 20,
    left: 20
  },
  clearButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10
  },
  columnWrapperStyle: {
    justifyContent: 'space-evenly'
  }
});
