import { View, StyleSheet, FlatList } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { updateSelectedTense } from '@/state/slices/SelectedTenseSlice';
import MainLayout from '@/components/layout/MainLayout';
import ListButton from '@/components/buttons/ListButton';
import { globalstyles } from '@/utils/GlobalStyle';

export default function TenseSelection() {

  const navigation = useAppNavigation();

  const dispatch = useAppDispatch()

  const tenseList = useAppSelector(state => state.tenseList.value)

  return (
    <MainLayout>

        <FlatList 
            style={globalstyles.flatList}
            contentContainerStyle={globalstyles.flatListContent}
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

     </MainLayout>
  );
}

const styles = StyleSheet.create({

});
