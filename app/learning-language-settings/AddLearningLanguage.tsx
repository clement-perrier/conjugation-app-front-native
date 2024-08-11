import { useAppNavigation } from '@/hooks/useAppNavigation';
import MainLayout from '@/components/layout/MainLayout';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { globalstyles } from '@/utils/GlobalStyle';
import ListButton from '@/components/buttons/ListButton';
import { LearningLanguage } from '@/types/LearningLanguage';
import { useMemo } from 'react';
import { addLearningLanguage, updateDefaultLearningLanguage } from '@/state/slices/UserSlice';
import { UpdateUserDefaultLearningLanguage, UpdateUserLearningLanguageList } from '@/services/ApiService';
import CustomFlatList from '@/components/layout/CustomFlatList';

export default function AddLearningLanguage() {

  const navigation = useAppNavigation()

  const dispatch = useAppDispatch();

  // Selectors
  const user = useAppSelector(state => state.User.value)
  const learningLanguageList: LearningLanguage[] = useAppSelector(state => state.LearningLanguageList.value)
  const learningLanguageListLoading: boolean = useAppSelector(state => state.LearningLanguageList.loading)
  
  // States

  // Derived data

  // Functions

  // Handlers

  // Buttons

  return (
    <MainLayout title='Available languages'>

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
                dispatch(addLearningLanguage(item))
                dispatch(updateDefaultLearningLanguage(item))
                user && 
                  (
                    UpdateUserLearningLanguageList(user.id, item.id),
                    UpdateUserDefaultLearningLanguage(user.id, item.id)
                  )
                navigation.navigate('Home')
              }}
              icon='chevron-right'
          />}
      >

      </CustomFlatList>

    </MainLayout>
  );
}

const styles = StyleSheet.create({

});
