import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';

export default function VerbSelection() {

  const navigation = useAppNavigation();

  return (
    <View style={styles.container}>
      <Text>Verb(s)  Selection</Text>
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
