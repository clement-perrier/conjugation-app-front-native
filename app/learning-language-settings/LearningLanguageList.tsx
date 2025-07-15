import { useAppNavigation } from '@/hooks/useAppNavigation';
import MainLayout from '@/components/layout/MainLayout';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useMemo } from 'react';
import { LearningLanguage } from '@/types/LearningLanguage';
import { globalstyles } from '@/utils/GlobalStyle';
import ListButton from '@/components/buttons/ListButton';
import { updateDefaultLearningLanguage } from '@/state/slices/UserSlice';
import { LayoutButton } from '@/types/LayoutButton';
import { UpdateUserDefaultLearningLanguage } from '@/services/ApiService';
import CustomFlatList from '@/components/layout/CustomFlatList';
import { Routes } from '@/types/RootStackParamList';

export default function LearningLanguageList() {

  const navigation = useAppNavigation()

  const dispatch = useAppDispatch();

  // Selectors
  const user = useAppSelector(state => state.User.value)

  // States

  // Derived data
  const learningLanguageList: LearningLanguage[] | undefined = useMemo(() => {
    return user?.learningLanguageList
  },[user])

  // Functions

  // Handlers

  // Buttons
  const buttons: LayoutButton[] = [
    {
      onPress: () => navigation.navigate(Routes.AddLearningLanguage),
      icon: 'add',
      iconOnly: true
    }
  ]

  return (
    
    <MainLayout buttons={buttons} title='Your languages'>

      <CustomFlatList
        data={learningLanguageList}
        itemSeparatorHeight={30}
        renderItem={({item}) => 
          <ListButton 
            key={item.id}
            label={item.name}
            disabled={user?.defaultLearningLanguage.id === item.id}
            onPress={() =>{
              dispatch(updateDefaultLearningLanguage(item))
              user && UpdateUserDefaultLearningLanguage(user.id, item.id)
              navigation.popToTop()
            }}
            // icon='chevron-right'
          />
        }
      >

      </CustomFlatList>

    </MainLayout>
  );
}

const styles = StyleSheet.create({

});
