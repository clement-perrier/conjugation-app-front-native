import { useAppSelector } from "@/state/hooks";
import { globalstyles } from "@/utils/GlobalStyle";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { Conjugation } from "@/types/Conjugation";
import { Table } from "@/types/Table";
import CustomProgressSteps from "../CustomProgressSteps";
import ConjugationLineView from "./ConjugationLineView";
import Styles from "@/constants/Styles";

interface TableViewProps {
    table: Table,
    isResult: boolean
}

export default function TableView({table, isResult} : TableViewProps){

    return(
           
        <View>        

            {/* Conjugation table title */}
            <Text style={[globalstyles.text, globalstyles.uppercase, styles.title]}>{table.tense.name} - {table.verb.name}</Text>

            {/* Conjugation lines */}
            <View style={{width:'100%'}}>
                {
                    table.conjugationList?.map((conjugation: Conjugation, index: number) => {
                        
                        const isLastLine = table.conjugationList ? index === table.conjugationList.length - 1 : false;

                        return <ConjugationLineView conjugation={conjugation} isLastLine={isLastLine} isResult={isResult} key={conjugation.id}/>

                    })
                }
            </View>

        </View>

    )
                         
}

const styles = StyleSheet.create({
    tableContainer: {
        alignItems: 'center',
        width: '100%'
    },
    table: {
        // paddingVertical: 20,
        // paddingHorizontal: 50,
        // borderRadius: 10,
        // alignItems: 'center',
        // maxWidth: 1000,
        // width: '100%'
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
    title: {
        color: Colors.textSecondary, 
        marginBottom: 15
    }
});