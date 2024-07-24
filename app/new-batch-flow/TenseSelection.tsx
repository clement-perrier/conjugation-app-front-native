import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { Tenses } from '@/constants/Tenses';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { updateSelectedTense } from '@/state/slices/SelectedTenseSlice';
import { useEffect } from 'react';
import { FetchTenseList } from '@/services/ApiService';
import MainLayout from '@/components/layout/MainLayout';

export default function TenseSelection() {

  const navigation = useAppNavigation();

  const dispatch = useAppDispatch()

  const tenseList = useAppSelector(state => state.tenseList.value)

  const tenseListE = tenseList.map(tense => 
    <View key={tense.id} style={styles.button}>
      <Button
        title={tense.name}
        onPress={() => {
          dispatch(updateSelectedTense(tense));
          navigation.push('Verb(s) selection')}
        }
      />
    </View>
  )

  return (
    <MainLayout>

      <View>
        {tenseListE}
      </View>

    </MainLayout>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
    width: 250
  }
});
