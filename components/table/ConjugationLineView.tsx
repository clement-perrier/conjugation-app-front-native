import { useAppSelector } from "@/state/hooks";
import { globalstyles } from "@/utils/GlobalStyle";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { Conjugation } from "@/types/Conjugation";

interface ConjugationLineViewProps {
    conjugation: Conjugation,
    isLastLine: boolean,
    isResult: boolean
}

export default function ConjugationLineView({conjugation, isLastLine, isResult} : ConjugationLineViewProps){

  const selectedBatch = useAppSelector(state => state.SelectedBatch.value);

    return(

        // Container
        <View 
            key={conjugation.id}
            style={[
                globalstyles.flexRow, 
                styles.conjugation,
                isLastLine && styles.lastConjugation,
                // results ? (conjugation.correct ? styles.conjugationCorrect : styles.conjugationIncorrect) : styles.conjugationNormal
            ]}
        >

            {/* Text line: Pronoun, conjugated verb and useer wrong answer (if isResult and !conjugation.correct) */}
            {
                isResult ?  
                    <>
                        <Text 
                            key={conjugation.id}
                            style={{color: conjugation.correct ? Colors.success : Colors.error}}
                        >
                            {conjugation.pronoun.name}
                            <Text style={{fontWeight: '500'}}> {conjugation.name}  </Text>
                            {/* User answer when user is wrong */}
                            {/* textDecorationLine: 'line-through' */}
                            {!conjugation.correct && <Text style={{textDecorationLine: 'line-through'}}>{conjugation.userAnswer}</Text>}
                        </Text>
                        <Feather  name={conjugation.correct ? "check" : 'x'} size={15} color={conjugation.correct ? Colors.success : Colors.error} style={{marginTop: 4}}/>
                    </> 
                :
                    <>
                        {/* Correct answer */}
                        <Text 
                            key={conjugation.id}
                            style={{color: Colors.textSecondary}}
                        >
                            {conjugation.pronoun.name}
                            <Text style={{fontWeight: '500'}}> {conjugation.name}  </Text>
                        </Text>
                    </>
            }
        </View>
        
    )
                          
}

const styles = StyleSheet.create({
    conjugation: {
        padding: 10,
        borderBottomWidth: 1,
        justifyContent: 'center',
        borderBottomColor: Colors.accent
    },
    lastConjugation: {
        borderBottomWidth: 0,
        paddingBottom: 0
    },
    conjugationNormal: {
        borderBottomColor: Colors.accent,
    },
    conjugationCorrect: {
        borderBottomColor: Colors.success,
    },
    conjugationIncorrect: {
        borderBottomColor: Colors.textSecondary
    }
});