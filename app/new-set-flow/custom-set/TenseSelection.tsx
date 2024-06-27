import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/types/RootStackParamList';

export default function TenseSelection() {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text>Tense(s) Selection</Text>
      <Button 
        title='Next'
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
