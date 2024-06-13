import { View, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Button from '@/components/Button';

export default function NewSet() {

  return (
    <View style={styles.container}>
      <Button label='Custom set' linkTo='newSet/customSet/verbSelection'/>
      <Button label='Pre set' linkTo='newSet/preSetList'/>
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
