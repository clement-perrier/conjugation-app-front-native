import { View, FlatList, StyleSheet, Text, Image, Pressable } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { useEffect, useMemo } from 'react';
import { FetchPronounList, FetchBatchList, FetchTableList, FetchTenseList, FetchVerbList, FetchUser, FetchLearningLanguageList } from '@/services/ApiService';
import { formatDateAsLong } from '@/utils/Date';
import { updateSelectedBatch } from '@/state/slices/SelectedBatchSlice';
import MainLayout from '@/components/layout/MainLayout';
import { LayoutButton } from '@/types/LayoutButton';
import ListButton from '@/components/buttons/ListButton';
import { globalstyles } from '@/utils/GlobalStyle';
import { User } from '@/types/User';
import { Batch } from '@/types/Batch';
import IconButton from '@/components/buttons/IconButton';
import flags from '@/utils/flags';

export default function Home() {

  const navigation = useAppNavigation()
  const dispatch = useAppDispatch();

  // Selectors
  const user = useAppSelector(state => state.User.value)
  const batchList = useAppSelector(state => state.BatchList.value)

  // Derived data

  const sortedBatchList: Batch[] = useMemo(() => {
    return batchList.slice().sort((a, b) => new Date(a.reviewingDate).valueOf() - new Date(b.reviewingDate).valueOf())
  }, [batchList])
  
  //  Effects
  useEffect(() => {
    dispatch(FetchUser())
    dispatch(FetchLearningLanguageList())
    // TENSES, VERBS, PRONOUNS, CONJUGATIONS(table shaped) and SETS dispatched to the store
    /* const fetchData = async () => {
      const user: User = await dispatch(FetchUser()).unwrap();
      const languageId = user.defaultLearningLanguageId
      // In ApiService put all the following dispatch in one function name like fetchLanguageData()
      await dispatch(FetchTenseList(languageId))
      await dispatch(FetchVerbList(languageId))
      await dispatch(FetchPronounList(languageId))
      await dispatch(FetchTableList(languageId))
      await dispatch(FetchBatchList({userId: user.id, languageId}))
    };
    fetchData() */
  },[])

  useEffect(() => {
    if (user && user.defaultLearningLanguage) {
      const languageId = user.defaultLearningLanguage.id
      dispatch(FetchTenseList(languageId))
      dispatch(FetchVerbList(languageId))
      dispatch(FetchPronounList(languageId))
      dispatch(FetchTableList(languageId))
      dispatch(FetchBatchList({userId: user.id, languageId}))
    }
  }, [user])

  // Functions
  const fetchDataByLanguage = async (languageId: number) => {
    
  }

  // Buttons
  const buttons: LayoutButton[] = [
    {
      onPress: () => navigation.navigate('Tense(s) selection'),
      icon: 'add',
      iconOnly: true
    }
  ]

  return (
    <>

      {/* Header with Settings and Flags buttons */}
      <View style={[globalstyles.flexRow, styles.header]}>
          
        <IconButton icon='settings' size={40}/>

        <Pressable 
              style={({ pressed }) => [
                styles.flagButton,
                pressed && styles.buttonPressed
              ]}
              onPress={()=>{}}>
              <Image style={[styles.flagImage]} 
                     source={flags[user.defaultLearningLanguage.imageName]}/>
        </Pressable>

      </View>

    <MainLayout buttons={buttons}>
      <>
        {sortedBatchList && sortedBatchList.length > 0 
          ? (<FlatList
                style={globalstyles.flatList}
                contentContainerStyle={globalstyles.flatListContent}
                data={sortedBatchList}
                renderItem={({item}) => 
                    <ListButton 
                      key={item.id}
                      label={formatDateAsLong(item.reviewingDate) + ' - Day ' + item.dayNumber + '    '}
                      onPress={() =>{
                        dispatch(updateSelectedBatch(item))
                        navigation.navigate('Start')
                      }}
                      icon='chevron-right'
                    />
                }
                ItemSeparatorComponent={() => <View style={{height: 20}} />}
                >
            </FlatList>) 
          : (<Text>No sets available</Text>)
        }
      </>
    </MainLayout>
    </>
  );
}

const styles = StyleSheet.create({
  flagButton: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#black',
    // padding: 4,
    // elevation: 5, // Shadow for Android
    // shadowColor: '#000', // Shadow for iOS
  },
  buttonPressed: {
    backgroundColor: '#DDDDDD', // Background color when pressed
  },
  flagImage: {
    width: 40,
    height: 30
  },
  header: {
    paddingHorizontal: 15,
    paddingTop: 15,
    justifyContent: 'space-between'
  }
});