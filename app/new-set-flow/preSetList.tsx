import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function PreSetList() {

  return (
    <View style={styles.container}>
      <Text>Pre Set List</Text>
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
