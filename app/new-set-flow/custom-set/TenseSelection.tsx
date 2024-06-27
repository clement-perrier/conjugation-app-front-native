import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { useNavigationCustom } from '@/hooks/useAppNavigation';

export default function TenseSelection() {

  const navigation = useNavigationCustom();

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
