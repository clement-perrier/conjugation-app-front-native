import { View, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { updateSelectedTense } from '@/state/slices/SelectedTenseSlice';
import MainLayout from '@/components/layout/MainLayout';
import ListButton from '@/components/buttons/ListButton';
import { createEntityAdapter } from '@reduxjs/toolkit';

export default function TenseSelection() {

  const navigation = useAppNavigation();

  const dispatch = useAppDispatch()

  const tenseList = useAppSelector(state => state.tenseList.value)

  return (
    <MainLayout>

      {/* <View style={{flex: 1, padding: 10}}> */}

        <FlatList 
            style={{ height: 10, width: '100%'}}
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
            data={tenseList}
            renderItem={({item}) => 
                <ListButton
                  label={item.name}
                  onPress={() => {
                    dispatch(updateSelectedTense(item));
                    navigation.push('Verb(s) selection')
                  }}
                />
              }
            ItemSeparatorComponent={() => <View style={{height: 15}} />}
            >
          </FlatList>

        {/* </View> */}

     </MainLayout>
  );
}

const styles = StyleSheet.create({

});
