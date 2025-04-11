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

  return (
    <MainLayout title='Available languages' customStyle={isOnBoarding && {marginTop: Styles.mainPadding}}>
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
              disabled={(user && user.learningLanguageList) ? user.learningLanguageList.some(language => language.id === item.id) : false}
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
                !isOnBoarding && navigation.navigate('Home')
              }}
              // icon='chevron-right'
            />}
        >

        </CustomFlatList>
      </>

    </MainLayout>
  );
}

const styles = StyleSheet.create({

});
