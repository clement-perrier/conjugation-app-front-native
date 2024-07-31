import { useAppSelector } from "@/state/hooks";
import { globalstyles } from "@/utils/GlobalStyle";
import { Feather } from "@expo/vector-icons";
import { FlatList, View, Text, StyleSheet } from "react-native";

export default function TableList({results} : {results: boolean}){

  const selectedBatch = useAppSelector(state => state.SelectedBatch.value);

    return(
        <FlatList
            style={globalstyles.flatList}
            contentContainerStyle={globalstyles.flatListContent}
            data={selectedBatch?.tableList}
            renderItem={({item}) => {
                const correct = !item.conjugationList?.some(conjugation => conjugation.correct === false)
                return (
                    <View style={globalstyles.flexRow}>
                        <View 
                            key={item.tense.id + item.verb.id} 
                            style={[styles.table, 
                                    results ? 
                                            (correct ? styles.tableCorrect : styles.tableIncorrect) 
                                            : styles.tableNormal]}>
                            <Text style={styles.uppercase}>{item.tense.name} - {item.verb.name}</Text>
                            {
                                item.conjugationList?.map(conjugation => 
                                <Text 
                                    key={conjugation.id}
                                    style={[styles.conjugation, 
                                        results ? 
                                                (conjugation.correct ? styles.conjugationCorrect : styles.conjugationIncorrect) 
                                                : styles.conjugationNormal]}>
                                    {conjugation.pronoun + ' ' + conjugation.name}
                                </Text>
                                )
                            }
                        </View>
                        {/* {results && (correct ? <Feather name="check" size={20} color="green" /> : <Feather name="x" size={20} color="red" />)} */}
                        {results && <Feather name={correct ? "check" : 'x'} size={30} color={correct ? "green" : 'red'} />}
                    </View>
                    )
            }}
            ItemSeparatorComponent={() => <View style={{height: 20}} />}
        >
      </FlatList>
    )
}

const styles = StyleSheet.create({
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    table: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 2,
        flex: 1
    },
    tableNormal: {
        borderColor: 'gray',
        backgroundColor: 'rgba(50, 50, 50, 0.2)'
    },
    tableCorrect: {
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.2)'
    },
    tableIncorrect: {
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)'
    },
    conjugation: {
        padding: 5,
        borderRadius: 5,
        borderWidth: 1
    },
    conjugationNormal: {
        borderColor: 'gray',
        backgroundColor: 'rgba(50, 50, 50, 0.3)'
    },
    conjugationCorrect: {
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.3)'
    },
    conjugationIncorrect: {
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.3)'
    },
    uppercase: {
        textTransform: 'uppercase'
    }
});