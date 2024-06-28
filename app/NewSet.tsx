import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/types/RootStackParamList';

export default function NewSet() {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Button 
        title='Custom set'
        onPress={() => navigation.navigate('Tense(s) selection')}
      />
      <Button 
        title='Pre-set'
        onPress={() => navigation.navigate('Pre-set list')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
