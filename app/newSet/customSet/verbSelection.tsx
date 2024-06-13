import { View, Text, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Button from '@/components/Button';

export default function VerbSelection() {

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>Verb  Selection</Text>
      {/* <Button label="Dismiss" onPress={() => router.dismiss(3)} /> */}
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
