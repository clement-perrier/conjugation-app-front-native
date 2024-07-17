import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useAppSelector } from "@/state/hooks";
import { useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { StyleSheet } from "react-native";

export default function SetSummary() {

  const navigation = useAppNavigation();

  const selectedSet = useAppSelector(state => state.SelectedSet.value);

  useEffect(() => {
    console.log(selectedSet)
  },[selectedSet])

  return (
    <View style={styles.container}>

      <Text>Start learning when you're ready</Text>

      <FlatList
        data={selectedSet?.tableList}
        renderItem={({item}) => 
          <View key={item.tense.id + item.verb.id} style={styles.table}>
            <Text style={styles.uppercase}>{item.tense.name} - {item.verb.name}</Text>
              {
                item.conjugationList?.map(conjugation => 
                  <Text key={conjugation.id}>{conjugation.pronounName + ' ' + conjugation.name}</Text>
                )
              }
          </View>
        }
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
      >
      </FlatList>

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
