import { useAppNavigation } from '@/hooks/useAppNavigation';
import MainLayout from '@/components/layout/MainLayout';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { globalstyles } from '@/utils/GlobalStyle';
import ListButton from '@/components/buttons/ListButton';
import { LearningLanguage } from '@/types/LearningLanguage';
import { useEffect, useMemo } from 'react';
import { addLearningLanguage, updateDefaultLearningLanguage } from '@/state/slices/UserSlice';
import { UpdateUserDefaultLearningLanguage, UpdateUserLearningLanguageList } from '@/services/ApiService';
import CustomFlatList from '@/components/layout/CustomFlatList';
import { updateIsOnBoarding } from '@/state/slices/isOnBoardingSlice';

export default function AddLearningLanguage() {

  const navigation = useAppNavigation()

  const dispatch = useAppDispatch();

  // Selectors
  const user = useAppSelector(state => state.User.value)
  const learningLanguageList: LearningLanguage[] = useAppSelector(state => state.LearningLanguageList.value)
  const learningLanguageListLoading: boolean = useAppSelector(state => state.LearningLanguageList.loading)
  const isOnBoarding: boolean = useAppSelector(state => state.IsOnBoarding.value)

  // Effects
  useEffect(() => {
    if (isOnBoarding && user?.defaultLearningLanguage) {
      navigation.navigate('Home');
    }
  }, [isOnBoarding, user?.defaultLearningLanguage]);

  // useEffect(() => {
  //   console.log(isOnBoarding, 'on boarding update')
  // }, [isOnBoarding]);

  return (
    <MainLayout title='Available languages'>
      <>
      <CustomFlatList
        data={learningLanguageList}
        isLoading={learningLanguageListLoading}
        emptyMessage='No languages available for this user.'
        renderItem={({item}) => 
            <ListButton 
              key={item.id}
              label={item.name}
              disabled={user?.learningLanguageList.some(language => language.id === item.id)}
              onPress={() =>{
                // Updating Redux state
                dispatch(addLearningLanguage(item))
                dispatch(updateDefaultLearningLanguage(item))
                user && 
                  (
                    // Updating database
                    UpdateUserLearningLanguageList(user.id, item.id),
                    UpdateUserDefaultLearningLanguage(user.id, item.id)
                  )
                  console.log(isOnBoarding)
                !isOnBoarding && 
                  (
                    navigation.navigate('Home')
                  )
              }}
              icon='chevron-right'
          />}
      >

      </CustomFlatList>
      </>

    </MainLayout>
  );
}

const styles = StyleSheet.create({

});
