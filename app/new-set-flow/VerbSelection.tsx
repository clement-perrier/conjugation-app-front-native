import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppSelector } from '@/state/hooks';
import { TenseState } from '@/state/interfaces/TenseState';
import { RootState } from '@/state/store';
export default function VerbSelection() {

  const navigation = useAppNavigation();

  const selectedTense = useAppSelector(state => state.selectedTense.value)

  return (
    <View style={styles.container}>
      { selectedTense && <Text>{selectedTense.name}</Text> }
      <Button 
        title='ADD TO SET'
        onPress={() => navigation.navigate('Set summary')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
