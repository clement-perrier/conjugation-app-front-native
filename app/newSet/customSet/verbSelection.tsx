import { View, Text, StyleSheet } from 'react-native';

export default function VerbSelection() {
  return (
    <View style={styles.container}>
      <Text>Verb  Selection</Text>
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
