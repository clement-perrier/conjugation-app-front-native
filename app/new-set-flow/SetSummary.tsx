import { useAppNavigation } from '@/hooks/useAppNavigation';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native';

export default function SetSummary() {

  const navigation = useAppNavigation();

  return (
    <View style={styles.container}>
      <Text>Set Summary</Text>
      <Button 
        title='ADD MORE'
        onPress={() => navigation.navigate('Tense(s) selection')}
      />
      <Button 
        title='VALIDATE'
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
