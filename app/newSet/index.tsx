import { View, Text, StyleSheet } from 'react-native';
import Button from '@/components/Button';

export default function Tab() {
  return (
    <View style={styles.container}>
      <Text>Tab [New sSet]</Text>
      <Button label='Custom Set' />
      <Button label="Pre Set"/>
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
