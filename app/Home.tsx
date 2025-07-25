import { View, StyleSheet, Text } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FetchPronounList, FetchBatchList, FetchTableList, FetchTenseList, FetchVerbList } from '@/services/ApiService';
import { formatBatchTitle } from '@/utils/Date';
import { updateSelectedBatch } from '@/state/slices/SelectedBatchSlice';
import MainLayout from '@/components/layout/MainLayout';
import { LayoutButton } from '@/types/LayoutButton';
import ListButton from '@/components/buttons/ListButton';
import { globalstyles } from '@/utils/GlobalStyle';
import { Batch } from '@/types/Batch';
import IconButton from '@/components/buttons/IconButton';
import CustomFlatList from '@/components/layout/CustomFlatList';
import FlagButton from '@/components/buttons/FlagButton';
import { updateIsOnBoarding } from '@/state/slices/isOnBoardingSlice';
import Spinner from '@/components/layout/Spinner';
import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';
import { isDueToday } from '@/utils/Date';
import { Routes } from '@/types/RootStackParamList';
import { registerForPushNotificationsAsync } from '@/services/NotificationService';
import { Platform } from 'react-native';
import useDisableBackHandler from '@/hooks/useDisableBackHandler';

export default function Home() {

  const navigation = useAppNavigation()
  const dispatch = useAppDispatch();

  // Disable the back button for this screen
  useDisableBackHandler()

  // States
  const [refreshing, setRefreshing] = useState(false);
  
  // Selectors
  const user = useAppSelector(state => state.User.value)
  const userIsLoading = useAppSelector(state => state.User.loading)
  const batchList = useAppSelector(state => state.BatchList.value)
  const batchListLearningLanguageId = useAppSelector(state => state.BatchList.learningLanguageId)
  const batchListLoading = useAppSelector(state => state.BatchList.loading)

  // Functions
  const onRefresh = async () => {
    setRefreshing(true);
    
    // Simulate a network request or fetch data here
    // await new Promise(resolve => setTimeout(resolve, 2000));
    user && await dispatch(FetchBatchList({userId: user.id, languageId: user.defaultLearningLanguage.id}))

    setRefreshing(false);
  };

  // Sorted batch list by ascending reviewing date then by ascending day number
  const sortedBatchList: Batch[] = useMemo(() => {
    return batchList.slice().sort((a: Batch, b: Batch) => 
      new Date(a.reviewingDate).valueOf() - new Date(b.reviewingDate).valueOf() ||
      a.dayNumber - b.dayNumber
    ) 
  }, [batchList])

  // Effects
  useEffect(() => {

    // if (user && user.defaultLearningLanguage) {
    //   const languageId = user.defaultLearningLanguage.id
    //   if (!batchListLoading){
    //     dispatch(FetchTenseList(languageId))
    //     dispatch(FetchVerbList(languageId))
    //     dispatch(FetchPronounList(languageId))
    //     dispatch(FetchTableList(languageId))
    //     dispatch(FetchBatchList({userId: user.id, languageId}))
    //     dispatch(updateIsOnBoarding(false))
    //   }
    // }

    const setupNotifications = async () => {
      if (Platform.OS !== 'web' && user) { // Ensure the app is not running on web and the user is logged in
        const token = await registerForPushNotificationsAsync(user.id);
        if (token) {
          console.log('Push notification token:', token);
          // Save the token to your backend or state
        }
      }
    };

    !user?.defaultLearningLanguage && setupNotifications();
  }, [])

  useEffect(() => {
    if (user && user.defaultLearningLanguage) {
      const languageId = user.defaultLearningLanguage.id
      if (!batchListLoading){
        dispatch(FetchTenseList(languageId))
        dispatch(FetchVerbList(languageId))
        dispatch(FetchPronounList(languageId))
        dispatch(FetchTableList(languageId))
        dispatch(FetchBatchList({userId: user.id, languageId}))
        dispatch(updateIsOnBoarding(false))
      }
    }
  }, [user]); 

  // Buttons
  const buttons: LayoutButton[] = [
    {
      onPress: () => navigation.navigate(Routes.TenseSelection),
      icon: 'add',
      iconOnly: true
    }
  ]

  if(userIsLoading){
    return <Spinner text={'Loading user'}/>
  }

  return (
    <>
      <View style={[globalstyles.flexRow, styles.header]}>

        { 
          user &&
            <FlagButton countryName={user.defaultLearningLanguage.imageName} onPress={() => navigation.navigate(Routes.LearningLanguageList)}/>
        }

        <IconButton  
          icon='settings' 
          size={33}
          onPress={() => navigation.navigate(Routes.Settings)}
          style={globalstyles.headerButton}
        /> 
        
      </View>

      {/* Batches list */}
      <MainLayout buttons={buttons}>
        <>
          <CustomFlatList
            data={sortedBatchList}
            isLoading={batchListLoading && !refreshing}
            refreshing={refreshing}
            onRefresh={onRefresh}
            emptyMessage="Create a repetition set to start learning"
            itemSeparatorHeight={25}
            renderItem={({ item, index } : {item: Batch, index: number}) => (
              <>
                {/* Padding top */}
                {index === 0 && <View style={{height: Styles.mainPadding}}></View>}

                {/* Button */}
                <ListButton 
                  key={item.id}
                  label={formatBatchTitle(item)}
                  onPress={() => {
                    dispatch(updateSelectedBatch(item));
                    navigation.navigate(Routes.Start)
                  }}
                  // icon='chevron-right'
                  focus={isDueToday(item.reviewingDate)}
                />

                <View style={[{width: '100%', columnGap: 0, justifyContent: 'center', margin: 1}]}>
                  {
                    item.tableList.map((table, index) => 
                      <View key={index}  style={{ margin: 1, padding: 5, backgroundColor: Colors.tertiary, borderRadius: 8 }}>
                        <Text style={[globalstyles.text, globalstyles.uppercase, { fontSize: 11, fontStyle: 'italic' }]} key={index}>
                          {table.verb.name} - {table.tense.name}
                        </Text>
                      </View>
                    )
                  }
                </View>

                {/* Padding bottom */}
                {index === sortedBatchList.length - 1 && <View style={{height: Styles.mainPadding}}></View>}
              </>
            )}
          />
        </>
      </MainLayout>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
  },
  tableContainer: {
    margin: 1,
    padding: 5,
    backgroundColor: Colors.tertiary,
    borderRadius: 8,
  },
  tableText: {
    ...globalstyles.text,
    ...globalstyles.uppercase,
    fontSize: 11,
    fontStyle: 'italic',
  },
});