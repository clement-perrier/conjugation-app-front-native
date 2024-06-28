import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';

export default function TenseSelection() {

  const navigation = useAppNavigation();

  return (
    <View style={styles.container}>
      <Text>Tense(s) Selection</Text>
      <Button 
        title='NEXT'
        onPress={() => navigation.navigate('Verb(s) selection')}
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
