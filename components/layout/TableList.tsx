import { useAppSelector } from "@/state/hooks";
import { globalstyles } from "@/utils/GlobalStyle";
import { Feather } from "@expo/vector-icons";
import { FlatList, View, Text, StyleSheet } from "react-native";
import CustomFlatList from "./CustomFlatList";
import { Conjugation } from "@/types/Conjugation";
import Colors from "@/constants/Colors";

export default function TableList({results} : {results: boolean}){

  const selectedBatch = useAppSelector(state => state.SelectedBatch.value);

    return(

        <CustomFlatList
            data={selectedBatch.tableList}
            isLoading={false}
            emptyMessage=""
            renderItem={({item}) => {
                const correct = !item.conjugationList?.some((conjugation: Conjugation) => conjugation.correct === false)
                return (
                        <View 
                            key={item.tense.id + item.verb.id} 
                            style={[styles.table,  globalstyles.flexColumn,
                                    results ? 
                                            (correct ? styles.tableCorrect : styles.tableIncorrect) 
                                            : styles.tableNormal]}>
                        
                            {/* Encouraging message */}
                            {
                                results &&
                                    <View style={[globalstyles.flexRow, {justifyContent: 'center'}]}>
                                        {results && <Feather style={{textAlign: 'center'}} name={correct ? "check" : 'x'} size={35} color={correct ? Colors.success : Colors.error} />}
                                        <Text style={{color: correct ? Colors.success : Colors.error}}>
                                            {correct
                                                ? "Well done!"
                                                : "Some answers weren’t quite right. Please try again tomorrow. You’ll get it!"
                                            }
                                        </Text>
                                    </View>
                            }

                            {/* Conjugation table title */}
                            <Text style={[globalstyles.text, styles.uppercase, {color: Colors.textSecondary}]}>{item.tense.name} - {item.verb.name}</Text>

                            {/* Conjugation lines */}
                            <View>
                                {
                                    item.conjugationList?.map((conjugation: Conjugation, index: any) => 
                                        // Conjugation line
                                        <View 
                                            key={conjugation.id}
                                            style={[
                                                globalstyles.flexRow, 
                                                styles.conjugation,
                                                index === item.conjugationList.length -1 && styles.lastConjugation,
                                                // results ? (conjugation.correct ? styles.conjugationCorrect : styles.conjugationIncorrect) : styles.conjugationNormal
                                            ]}
                                        >
                                            <Text 
                                                key={conjugation.id}
                                                style={{color: results ? (conjugation.correct ? Colors.success : Colors.error) : Colors.textSecondary}}
                                            >
                                                {conjugation.pronoun.name + ' ' + conjugation.name}
                                            </Text>
                                            {results && <Feather  name={conjugation.correct ? "check" : 'x'} size={15} color={conjugation.correct ? Colors.success : Colors.error} style={{marginTop: 4}}/>}
                                        </View>

                                    )
                                }
                            </View>

                        </View>
                )
            }}
        >
        </CustomFlatList>
    )
}

const styles = StyleSheet.create({
    table: {
        padding: 20,
        borderRadius: 10
    },
    tableNormal: {
        backgroundColor: Colors.secondary
    },
    tableCorrect: {
        backgroundColor: Colors.successBg
    },
    tableIncorrect: {
        backgroundColor: Colors.errorBg
    },
    conjugation: {
        padding: 10,
        borderBottomWidth: 1,
        justifyContent: 'center',
        borderBottomColor: Colors.accent
    },
    lastConjugation: {
        borderBottomWidth: 0
    },
    conjugationNormal: {
        borderBottomColor: Colors.accent,
        // color: Colors.accent
    },
    conjugationCorrect: {
        // color: Colors.success,
        borderBottomColor: Colors.success,
    },
    conjugationIncorrect: {
        // color: Colors.error,
        borderBottomColor: Colors.textSecondary
    },
    uppercase: {
        textTransform: 'uppercase'
    }
});