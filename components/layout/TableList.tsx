// import { StyleSheet, View, Text } from "react-native";
// import CustomFlatList from "./CustomFlatList";
// import Colors from "@/constants/Colors";
// import TableView from "../table/TableView";
// import { Batch } from "@/types/Batch";
// import { MaterialIcons } from "@expo/vector-icons";
// import { globalstyles } from "@/utils/GlobalStyle";
// import CustomProgressSteps from "../CustomProgressSteps";

// interface TableListProps {
//     isResult: boolean, 
//     batch: Batch, 
//     isCorrect?: boolean
// }

// export default function TableList({isResult, batch, isCorrect} : TableListProps){

//     return(
//         <>
//             {
//                 isResult ?
//                 (
//                     <View style={[styles.tableContainer, isCorrect ? styles.correct : styles.incorrect]}>

//                         {/* Encouraging message */}
//                         <View style={[globalstyles.flexRow]}>
//                             {
//                                 isCorrect ?
//                                     <>
//                                         <MaterialIcons name={'check'} size={35}  color={Colors.success}/>
//                                         <Text style={{color: Colors.success, flex: 1}}>Well done!</Text>
//                                     </>
//                                     :
//                                     <>
//                                         <MaterialIcons name={'loop'} size={35}  color={Colors.error}/>
//                                         <Text style={{color: Colors.error, flex: 1}}>
//                                             Some answers weren’t quite right. Please try again tomorrow. You’ll get it!
//                                         </Text>
//                                     </>
//                             }
//                         </View>

//                         {/* Days progression tracker */}
//                         <CustomProgressSteps currentStep={batch.dayNumber} isResult={true}/>

//                         {/* Table List */}
//                         {
//                             batch.tableList.map((item, index) => 
//                                     <TableView table={item} isResult={isResult} key={index}/>
//                             )
//                         }
//                         {/* <CustomFlatList
//                             data={batch.tableList}
//                             isLoading={false}
//                             emptyMessage=""
//                             renderItem={({item, index}) => {
//                                 return (
//                                     <TableView table={item} isResult={isResult} key={index}/>
//                                 )
//                             }}
//                         >
//                         </CustomFlatList> */}

//                     </View>
//                 )
//                     :
//                 (
//                     <CustomFlatList
//                         data={batch.tableList}
//                         isLoading={false}
//                         emptyMessage=""
//                         renderItem={({item, index}) => {
//                             return (
//                                 <View style={[styles.tableContainer, styles.noResult]}>
//                                     <TableView table={item} isResult={isResult} key={index}/>
//                                 </View>
//                             )
//                         }}
//                     >
//                     </CustomFlatList>
//                 )
//             }
//         </>
//     )
// }

// const styles = StyleSheet.create({
    
//     correct: {
//         backgroundColor: Colors.successBg
//     },
//     incorrect: {
//         backgroundColor: Colors.errorBg
//     }
// });