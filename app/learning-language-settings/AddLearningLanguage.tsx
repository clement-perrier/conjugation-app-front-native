import { useAppNavigation } from '@/hooks/useAppNavigation';
import MainLayout from '@/components/layout/MainLayout';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { globalstyles } from '@/utils/GlobalStyle';
import ListButton from '@/components/buttons/ListButton';
import { LearningLanguage } from '@/types/LearningLanguage';
import { useMemo } from 'react';
import { addLearningLanguage } from '@/state/slices/UserSlice';
import { UpdateUserLearningLanguageList } from '@/services/ApiService';

export default function AddLearningLanguage() {

  const navigation = useAppNavigation()

  const dispatch = useAppDispatch();

  // Selectors
  const user = useAppSelector(state => state.User.value)
  const learningLanguageList: LearningLanguage[] = useAppSelector(state => state.LearningLanguageList.value)
  
  // States

  // Derived data
  const userLearningLanguageList: LearningLanguage[] = useMemo(() => {
    return user.learningLanguageList
  },[user])

  // Functions

  // Handlers

  // Buttons

  return (
    <MainLayout title='Available languages'>

      {learningLanguageList && learningLanguageList.length > 0 
        ? (<FlatList
              style={globalstyles.flatList}
              contentContainerStyle={globalstyles.flatListContent}
              data={learningLanguageList}
              renderItem={({item}) => 
                  <ListButton 
                    key={item.id}
                    label={item.name}
                    disabled={user.learningLanguageList.some(language => language.id === item.id)}
                    onPress={() =>{
                      dispatch(addLearningLanguage(item))
                      const updatedUser = {...user, learningLanguageList: [...learningLanguageList, item]}
                      UpdateUserLearningLanguageList(user.id, item.id)
                      navigation.navigate('Learning language list')
                    }}
                    icon='chevron-right'
                  />
              }
              ItemSeparatorComponent={() => <View style={{height: 20}} />}
              >
          </FlatList>) 
        : (<Text>No languages available for this user.</Text>)
      }

    </MainLayout>
  );
}

const styles = StyleSheet.create({

});
