import { View, StyleSheet, Text, Button } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import TableList from '@/components/TableList';

export default function Results() {

  const navigation = useAppNavigation()

  // Selectors

  // States

  // Derived data

  // Functions

  // Handlers

  return (
    <View style={styles.container}>

      <Text>Results</Text>

      <TableList results={true}/>

      <Button title='ok' onPress={() => navigation.navigate('Home')}/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
