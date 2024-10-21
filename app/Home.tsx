import { View, StyleSheet, Text } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import React, { useEffect, useMemo, useState } from 'react';
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
import Flag from '@/components/Flag';
import { updateIsOnBoarding } from '@/state/slices/isOnBoardingSlice';
import Spinner from '@/components/layout/Spinner';
import { CustomAlert } from '@/utils/CustomAlert';
import { updateIsAuthenticated } from '@/state/slices/isAuthtenticated';
import AppSecureStore from '@/state/SecureStore';
import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';
import { requestNotificationPermission } from '@/services/NotificationService';

export default function Home() {

  const navigation = useAppNavigation()
  const dispatch = useAppDispatch();
  
  // Selectors
  const user = useAppSelector(state => state.User.value)
  const batchList = useAppSelector(state => state.BatchList.value)
  const batchListLoading = useAppSelector(state => state.BatchList.loading)

  // States
  const [loading, setLoading] = useState(false)

  // Derived data
  // Sorted batch list by ascending reviewing date then by ascending day number
  const sortedBatchList: Batch[] = useMemo(() => {
    console.log('batchList updated', batchList)
    return batchList.slice().sort((a, b) => 
      new Date(a.reviewingDate).valueOf() - new Date(b.reviewingDate).valueOf() ||
      a.dayNumber - b.dayNumber
    ) 
      
  }, [batchList])

  // Effects
  useEffect(() => {
    if (user && user.defaultLearningLanguage) {
      const languageId = user.defaultLearningLanguage.id
      dispatch(FetchTenseList(languageId))
      dispatch(FetchVerbList(languageId))
      dispatch(FetchPronounList(languageId))
      dispatch(FetchTableList(languageId))
      dispatch(FetchBatchList({userId: user.id, languageId}))
      dispatch(updateIsOnBoarding(false))
    }
  }, [user])

  // Buttons
  const buttons: LayoutButton[] = [
    {
      // onPress: () => navigation.navigate('Tense(s) selection'),
      onPress: () => navigation.navigate('Tense(s) selection'),
      icon: 'add',
      iconOnly: true
    },
    {
      // onPress: () => navigation.navigate('Tense(s) selection'),
      onPress: () => user && requestNotificationPermission(user.id),
      icon: 'interests',
      iconOnly: true
    }
  ]

  if(loading){
    return <Spinner text={'Logging out'}/>
  }

  return (

    <>
    
      {/* Header with Settings and Flags buttons */}
      <View style={[globalstyles.flexRow, styles.header]}>
        
        {/* Learning language flag */}
        {
          user &&
          <Flag countryName={user.defaultLearningLanguage.imageName} onPress={() => navigation.navigate('Learning language list')}/>
        }

        <IconButton  
          icon='logout' 
          size={35}
          onPress={() => CustomAlert(
            'Confirm logout', 
            'Are you sure you want to logout ?',
            async () => {
                setLoading(true)
              // const response = await AuthLogout(user.email)
              // if(response){
                await AppSecureStore.SaveItemAsync('access_token', '');
                await AppSecureStore.SaveItemAsync('refresh_token', '');
                dispatch(updateIsAuthenticated(false))
                // navigation.navigate('Log in')
              // }
            }
            )}
          />

      </View>

      {/* Batches list */}
      <MainLayout buttons={buttons}>
          <CustomFlatList
              data={sortedBatchList}
              isLoading={batchListLoading}
              emptyMessage="Create a repetition set to start learning"
              itemSeparatorHeight={15}
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
                      navigation.navigate('Start');
                    }}
                    // icon='chevron-right'
                    focus={new Date(item.reviewingDate) <= new Date()}
                  />

                  <View style={[{width: '100%', columnGap: 0, justifyContent: 'center', margin: 1}]}>
                    {
                      item.tableList.map((table, index) => 
                        
                        <Text style={[globalstyles.text, globalstyles.uppercase, {margin: 1, fontSize: 11, fontStyle: 'italic', padding: 5, backgroundColor: Colors.tertiary, borderRadius: 8}]} key={index}>
                            {table.verb.name} - {table.tense.name}
                            {/* {index != item.tableList.length - 1 && ', '} */}
                        </Text>
                      )
                    }
                  </View>

                  {/* Padding bottom */}
                  {index === sortedBatchList.length - 1 && <View style={{height: Styles.mainPadding}}></View>}
                </>
              )}
            />
        
      </MainLayout>
      
    </>
    
  );
}

const styles = StyleSheet.create({
  buttonPressed: {
    backgroundColor: '#DDDDDD', // Background color when pressed
  },
  flagImage: {
    width: 40,
    height: 30
  },
  header: {
    justifyContent: 'space-between',
    height: 'auto',
    backgroundColor: 'white',
    paddingBottom: Styles.mainPadding
  }
});