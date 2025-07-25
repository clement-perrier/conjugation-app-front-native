import { useAppNavigation } from '@/hooks/useAppNavigation';
import MainLayout from '@/components/layout/MainLayout';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { StyleSheet } from 'react-native';
import ListButton from '@/components/buttons/ListButton';
import { LearningLanguage } from '@/types/LearningLanguage';
import { useEffect } from 'react';
import { addLearningLanguage, updateDefaultLearningLanguage } from '@/state/slices/UserSlice';
import { UpdateUserDefaultLearningLanguage, UpdateUserLearningLanguageList } from '@/services/ApiService';
import CustomFlatList from '@/components/layout/CustomFlatList';
import React from 'react';
import Styles from '@/constants/Styles';
import { updateIsOnBoarding } from '@/state/slices/isOnBoardingSlice';
import { Routes } from '@/types/RootStackParamList';
import Flag from '@/components/layout/Flag';

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
    console.log('boading', isOnBoarding)
    if (isOnBoarding && user?.defaultLearningLanguage) {
      navigation.navigate(Routes.Home);
    }
  }, [isOnBoarding, user?.defaultLearningLanguage]);

  return (
    // <MainLayout title='Available languages' customStyle={isOnBoarding && {marginTop: Styles.mainPadding}}>
    <MainLayout title='Available languages' customStyle={!user?.defaultLearningLanguage && styles.container}>
      <>
        <CustomFlatList
          data={learningLanguageList}
          isLoading={learningLanguageListLoading}
          itemSeparatorHeight={30}
          emptyMessage='No languages available for this user.'
          renderItem={({item}) => 
            <ListButton 
              key={item.id}
              label={item.name}
              icon={<Flag countryName={item.imageName}/>}
              disabled={(user && user.learningLanguageList) ? user.learningLanguageList.some(language => language.id === item.id) : false}
              onPress={() => {
                // Updating Redux state - user learning language list and user default learning language
                dispatch(addLearningLanguage(item))
                dispatch(updateDefaultLearningLanguage(item))
                // WHen on boarding, user chose at least one language, then he is not considered on boarding anymore
                isOnBoarding && dispatch(updateIsOnBoarding(false))
                user && 
                  (
                    // Updating database
                    UpdateUserLearningLanguageList(user.id, item.id),
                    UpdateUserDefaultLearningLanguage(user.id, item.id)
                  )
                // Navigation back home => No need, dispatching user.defaultLearningLanguage update is enough for the navigation stack to update
                // console.log(isOnBoarding)
                user?.defaultLearningLanguage && navigation.navigate(Routes.Home)
              }}
            />}
        >

        </CustomFlatList>
      </>

    </MainLayout>
  );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      padding: Styles.mainPadding,
  },
});
