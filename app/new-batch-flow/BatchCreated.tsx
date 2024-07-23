import TableList from "@/components/TableList";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useAppSelector } from "@/state/hooks";
import { useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { StyleSheet } from "react-native";

export default function BatchCreated() {

  const navigation = useAppNavigation();

  const selectedBatch = useAppSelector(state => state.SelectedBatch.value);

  useEffect(() => {
    console.log(selectedBatch)
  },[selectedBatch])

  return (
    <View style={styles.container}>

      <Text>Start learning when you're ready</Text>

      <TableList results={false}/>

      <Button 
        title='START'
        onPress={() => navigation.navigate('Question')}
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
  table: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5
  },
  uppercase: {
    textTransform: 'uppercase'
  }
});
