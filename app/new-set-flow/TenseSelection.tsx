import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { Tenses } from '@/constants/Tenses';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { updateSelectedTense } from '@/state/slices/SelectedTenseSlice';
import { useEffect } from 'react';
import { FetchTenseList } from '@/services/ApiService';

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
    <View style={styles.container}>
      {tenseListE}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginBottom: 20,
    width: 250
  }
});
