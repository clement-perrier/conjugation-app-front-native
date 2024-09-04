import { View, Text, StyleSheet, useWindowDimensions, TextInput } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { addSelectedTable } from '@/state/slices/SelectedTableListSlice';
import { useCallback, useMemo, useState } from 'react';
import IconButton from '@/components/buttons/IconButton';
import { Verb } from '@/types/Verb';
import { Table } from '@/types/Table';
import MainLayout from '@/components/layout/MainLayout';
import { LayoutButton } from '@/types/LayoutButton';
import ListButton from '@/components/buttons/ListButton';
import { globalstyles } from '@/utils/GlobalStyle';
import CustomFlatList from '@/components/layout/CustomFlatList';
import TextIconButton from '@/components/buttons/TextIconButton';
import Colors  from '@/constants/Colors';

export default function VerbSelection() {

  // Hooks
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const screenWidth = useWindowDimensions().width;

  // Selectors
  const selectedTableList = useAppSelector(state => state.selectedTableList.value);
  const selectedTense = useAppSelector(state => state.selectedTense.value);
  const tableList = useAppSelector(state => state.TableList.value) as Table[];
  const verbList = useAppSelector(state => state.verbList.value);
  const verbListLoading = useAppSelector(state => state.verbList.loading);
  const batchList = useAppSelector(state => state.BatchList.value);

  // const calcNumColumns = useCallback(() => Math.floor(screenWidth / (styles.buttonWidth.width + styles.selectedVerb.marginHorizontal + 10)), [])

  // States
  // const [numColumns, setNumColumns] = useState(() => calcNumColumns());
  const [searchedText, setSearchText] = useState('');
  const [selectedVerbList, setSelectedVerbList] = useState<Verb[]>([]);
  const numColumns = useMemo(() => Math.floor(screenWidth / (styles.buttonWidth.width + styles.selectedVerb.marginHorizontal + 10)), [screenWidth]);
  const [isFocused, setIsFocused] = useState(false);

  // Functions

  // const textFilter = useCallback((text: string) => {
  //   return unselectedVerbList.filter(verb => verb.name.includes(text));
  // }, [unselectedVerbList]);

  const removeSelectedVerb = useCallback((selectedVerb: Verb) => {
    setSelectedVerbList(prevList => prevList.filter(verb => verb.id !== selectedVerb.id));
  }, []);

  const addSelectedVerb = useCallback((selectedVerb: Verb) => {
    setSelectedVerbList(prevList => [...prevList, selectedVerb]);
  }, []);

  const getSelectedConjugationTableList = useCallback((): Table[] => {
    return selectedVerbList.reduce<Table[]>((result, verb) => {
      const foundTable = tableList.find(table => table.tense.id === selectedTense?.id && table.verb.id === verb.id);
      if (foundTable) {
        result.push(foundTable);
      } else {
        console.warn(`Table not found for tense ID ${selectedTense?.id} and verb ID ${verb.id}`);
      }
      return result;
    }, []);
  }, [selectedVerbList, tableList, selectedTense]);

  // Derived Data
  const unselectedVerbList = useMemo(() => {
    const selectedVerbIds = new Set(selectedVerbList.map(verb => verb.id));
    return verbList.filter(verb => !selectedVerbIds.has(verb.id));
  }, [verbList, selectedVerbList]);

  const filteredVerbList = useMemo(() => {
    const textFilter = (text: string) => {
      return unselectedVerbList.filter(verb => verb.name.includes(text));
    };
    return textFilter(searchedText.toLowerCase());
  }, [searchedText, unselectedVerbList]);

  const allTableList = useMemo(() => batchList.flatMap(batch => batch.tableList).concat(selectedTableList), [batchList, selectedTableList]);

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
    
    <MainLayout buttons={buttons} title={selectedTense ? `Select a verb in ${selectedTense.name}` : ''}>

      <>

        {/* SELECTED TENSE */}
        {/* { selectedTense && <Text style={globalstyles.title}>{selectedTense.name}</Text> } */}

        {/* SEARCH INPUT */}
        <View>

          <IconButton style={styles.searchButton} size={25} icon={'search'}/>
          
          {searchedText ?
              <IconButton style={styles.clearButton} size={25} icon={'clear'} onPress={() => setSearchText('')}/>
              :
              <></>
          }
          <TextInput
            style={[globalstyles.input, styles.input, isFocused && {borderWidth: 1, borderColor: Colors.primary}]}
            onChangeText={setSearchText}
            value={searchedText}
            placeholder="search verb"
            inlineImageLeft='react_logo'
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            />
            
        </View>

        <View style={{flex: 1}}>

          {/* SELECTED VERB LIST */}  
          <View style={{width: '100%', height: 'auto'}}>
            <CustomFlatList
              data={selectedVerbList}
              isLoading={false}
              // emptyMessage=''
              // key={numColumns}
              renderItem={({item}) => 
                <View style={{position: 'relative'}}>
                  <TextIconButton 
                    label={item.name} 
                    color='white' 
                    onPress={() => removeSelectedVerb(item)} 
                    iconSize={20} 
                    style={{ backgroundColor: 'grey' }} 
                    icon={'remove'}/>
                </View>
              }
              numColumns={numColumns}
              itemSeparatorHeight={10}
              columnWrapperStyle={numColumns > 1 && styles.columnWrapperStyle}
              style={{height: 'auto'}}
            >
            </CustomFlatList>
          </View>

          {/* VERB LIST */}
          <View style={{flex: 1, marginBottom: 10}}>
            <CustomFlatList
              data={filteredVerbList}
              isLoading={verbListLoading}
              emptyMessage='No verbs found'
              // numColumns={numColumns}
              key={numColumns}
              keyExtractor={(item: Verb) => item.id.toString()}
              itemSeparatorHeight={15}
              // columnWrapperStyle={numColumns > 1 && styles.columnWrapperStyle}
              style={[{flex: 1}, globalstyles.flatList]}
              renderItem={({item}) => 
                <ListButton
                  label={item.name}
                  onPress={() => addSelectedVerb(item)}
                  disabled={allTableList.some(table => table.tense.id === selectedTense?.id && table.verb.id === item.id)}
                />
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
    // height: 40,
    // margin: 12,
    borderWidth: 1,
    paddingVertical: 10,
    paddingLeft: 40,
    paddingRight: 100
  },
  searchButton: {
    position: 'absolute',
    top: 12,
    left: 10
  },
  clearButton: {
    position: 'absolute',
    top: 12,
    right: 10,
    zIndex: 10
  },
  columnWrapperStyle: {
    justifyContent: 'space-evenly',
    columnGap: 5
  }
});
