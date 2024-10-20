import { useAppNavigation } from '@/hooks/useAppNavigation';
import MainLayout from '@/components/layout/MainLayout';
import { LayoutButton } from '@/types/LayoutButton';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { updateIsNewBatchAdded } from '@/state/slices/isNewBatchAdded';
import { Batch } from '@/types/Batch';
import { hasMistake } from '@/types/Table';
import { View, StyleSheet, Text} from 'react-native';
import { globalstyles } from '@/utils/GlobalStyle';
import Colors from '@/constants/Colors';
import CustomProgressSteps from '@/components/CustomProgressSteps';
import TableView from '@/components/table/TableView';
import { MaterialIcons } from '@expo/vector-icons';
import { formatDateAsLong } from '@/utils/Date';
import { ScrollView } from 'react-native';
import Styles from '@/constants/Styles';

export default function Results() {

  const navigation = useAppNavigation()
  const dispatch = useAppDispatch()

  // Selectors
  const isNewBatchAdded = useAppSelector(state => state.IsNewBatchAdded.value)
  const updatedBatch = useAppSelector(state => state.SelectedBatch.value)
  const batchList = useAppSelector(state => state.BatchList.value)

  // States

  // Derived data

  // const updatedBatchIsCorrect = updatedBatch.tableList[0].correct

  // Functions
  const getLastBatchAdded = () : Batch => {
    return batchList[batchList.length - 1]
  }

  const isUpdatedBatchCorrect = () : boolean => {
    return !hasMistake(updatedBatch.tableList[0])
  }

  // Handlers

  // Buttons
  const buttons: LayoutButton[] = [
    {
      label: 'OK',
      onPress: () => {
        dispatch(updateIsNewBatchAdded(false))
        navigation.navigate('Home')
      }
    }
  ]

  return (

    <MainLayout buttons={buttons} title='Results'>

      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={[globalstyles.flexColumn, {paddingVertical: Styles.mainPadding}]}>

          {/* When batch is split between correct and wrong table(s) => displaying wrong table first */}
          { isNewBatchAdded && <Result batch={getLastBatchAdded()} isCorrect={false}/> }

          {/* Displaying either all wrong/all correct table */}
          <Result batch={updatedBatch} isCorrect={isUpdatedBatchCorrect()}/>

        </View>

      </ScrollView>

    </MainLayout>

  );
}

function Result({batch, isCorrect} : {batch: Batch, isCorrect: boolean}){
  
  return (
    
    <View style={[globalstyles.flexColumn, globalstyles.tableContainer, isCorrect ? styles.correct : styles.incorrect]}>

        {/* Encouraging message */}
        <View style={[globalstyles.flexRow]}>
            {
                isCorrect ?
                    <>
                        <MaterialIcons name={'check'} size={35}  color={Colors.success}/>
                        <Text style={{color: Colors.success, flex: 1}}>Well done! You've progressed to <Text style={{fontWeight: 'bold'}}>Day {batch.dayNumber}</Text></Text>
                    </>
                    :
                    <>
                        <MaterialIcons name={'loop'} size={35}  color={Colors.error}/>
                        <Text style={{color: Colors.error, flex: 1}}>
                            Some answers weren’t quite right. Repeat <Text style={{fontWeight: 'bold'}}>Day {batch.dayNumber}</Text> tomorrow. You’ll get it!
                        </Text>
                    </>
            }
        </View>

        {/* New Due date */}
        <Text style={globalstyles.text}>New due date: {formatDateAsLong(batch.reviewingDate)}</Text>

        {/* Days progression tracker */}
        <CustomProgressSteps currentStep={batch.dayNumber} isResult={true} isCorrect={isCorrect}/>

        {/* Table List */}
        {
            batch.tableList.map((item, index) => 
              <TableView table={item} isResult={true} key={index}/>
            )
        }

      </View>
  )
}

const styles = StyleSheet.create({
  correct: {
    backgroundColor: Colors.successBg
  },
  incorrect: {
      backgroundColor: Colors.errorBg
  }
})
