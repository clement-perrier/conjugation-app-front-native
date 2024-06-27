import { View, Text, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Button from '@/components/Button';

export default function SetSummary() {

  return (
    <View style={styles.container}>
      <Text>Set Summary</Text>
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
