import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/types/RootStackParamList';

export default function VerbSelection() {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text>Verb(s)  Selection</Text>
      <Button 
        title='Next'
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
