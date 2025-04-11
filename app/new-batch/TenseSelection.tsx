import { StyleSheet, View } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { updateSelectedTense } from '@/state/slices/SelectedTenseSlice';
import MainLayout from '@/components/layout/MainLayout';
import ListButton from '@/components/buttons/ListButton';
import CustomFlatList from '@/components/layout/CustomFlatList';

export default function TenseSelection() {

  const navigation = useAppNavigation();
  const dispatch = useAppDispatch()

  // Selectors
  const tenseList = useAppSelector(state => state.tenseList.value)
  const tenseListLoading = useAppSelector(state => state.tenseList.loading)

  return (
    <MainLayout title='Select a tense'>

      <CustomFlatList
        data={tenseList}
        isLoading={tenseListLoading}
        itemSeparatorHeight={30}
        emptyMessage='No verbs found for this language'
        renderItem={({ item }) => (
            <ListButton
              label={item.name}
              onPress={() => {
                dispatch(updateSelectedTense(item));
                navigation.push('Verb(s) selection');
              }}
            />
        )}
      />

    </MainLayout>
  );
}

const styles = StyleSheet.create({

});
