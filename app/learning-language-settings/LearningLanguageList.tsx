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

export default function LearningLanguageList() {

  const navigation = useAppNavigation()

  const dispatch = useAppDispatch();

  // Selectors
  const user = useAppSelector(state => state.User.value)

  // States

  // Derived data
  const learningLanguageList: LearningLanguage[] = useMemo(() => {
    return user.learningLanguageList
  },[user])

  // Functions

  // Handlers

  // Buttons
  const buttons: LayoutButton[] = [
    {
      onPress: () => navigation.navigate('Add learning language'),
      icon: 'add',
      iconOnly: true
    }
  ]

  return (
    <>
    
    <MainLayout buttons={buttons} title='Languages that you are currenlty learning'>

      {learningLanguageList && learningLanguageList.length > 0 
        ? (<FlatList
              style={globalstyles.flatList}
              contentContainerStyle={globalstyles.flatListContent}
              data={learningLanguageList}
              renderItem={({item}) => 
                  <ListButton 
                    key={item.id}
                    label={item.name}
                    disabled={user.defaultLearningLanguage.id === item.id}
                    onPress={() =>{
                      dispatch(updateDefaultLearningLanguage(item))
                      UpdateUserDefaultLearningLanguage(user.id, item.id)
                      navigation.navigate('Home')
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
    </>
  );
}

const styles = StyleSheet.create({

});
