import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { Tenses } from '@/constants/Tenses';
import { useAppDispatch } from '@/state/hooks';
import { updateSelectedTense } from '@/state/slices/selectedTenseSlice';

export default function TenseSelection() {

  const navigation = useAppNavigation();

  const dispatch = useAppDispatch()

  const tenseList = Tenses.map(tense => 
    <View key={tense.id} style={styles.button}>
      <Button
        title={tense.name}
        onPress={() => {
          dispatch(updateSelectedTense(tense));
          navigation.navigate('Verb(s) selection')}
        }
      />
    </View>
  )

  return (
    <View style={styles.container}>
      {tenseList}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 20,
    width: 250
  }
});
