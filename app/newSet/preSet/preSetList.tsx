import { View, Text, StyleSheet } from 'react-native';

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
