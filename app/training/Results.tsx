import { useAppNavigation } from '@/hooks/useAppNavigation';
import TableList from '@/components/layout/TableList';
import MainLayout from '@/components/layout/MainLayout';
import { LayoutButton } from '@/types/LayoutButton';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { Table, hasCorrect, hasMistake } from '@/types/Table';
import { addBatch, updateBatchInfo } from '@/state/slices/BatchListSlice';
import { SelectedBatchTest } from '@/constants/SelectedBatchTest';
import { Batch } from '@/types/Batch';
import addDays from '@/utils/AddDays';

export default function Results() {

  const navigation = useAppNavigation()
  const dispatch = useAppDispatch()

  // Selectors
  const selectedBatch = useAppSelector(state => state.SelectedBatch.value);

  // States

  // Derived data
  const allCorrect = !selectedBatch?.tableList.some(table => hasMistake(table))
  const allMistake = !selectedBatch?.tableList.some(table => hasCorrect(table))

  // Functions
  const getIncrement = (dayNumber: number) : number => {
    switch (dayNumber) {
      case 0:
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 3;
      case 7:
        return 8;
      case 15:
        return 15;
      case 30:
        return 30;
      case 60:
        return 45;
      default:
        return 1;
    }
  }

  // Handlers
  const handleResults = () => {

    if(allCorrect || allMistake){

      // Update Current Batch day number and reviewing date depending on day number
      // e.g. day number = 1 => dayNumber + 1 and reviewing date + 1, day number = 2 => dayNumber + 2 and reviewing date + 2
      selectedBatch && selectedBatch.id &&
        dispatch(
          updateBatchInfo({
            batchId: selectedBatch.id, 
            isCorrect: allCorrect, 
            increment: allCorrect ? getIncrement(selectedBatch.dayNumber) : 1
          })
        )

    } else {
      // Correct tables
      const correctTables = selectedBatch?.tableList.filter(table => !hasMistake(table))
            
      // Updating current batch day number and reviewing date and with correct tables (removing mistaken tables)
      selectedBatch && selectedBatch.id &&
        dispatch(
          updateBatchInfo({
            batchId: selectedBatch.id, 
            isCorrect: true, 
            increment: getIncrement(selectedBatch.dayNumber),
            newTableList: correctTables
          })
        )

      // Find wrong Table(s) remove them from current batch into new Batch (add new batch to batchList)
      const mistakenTables = selectedBatch?.tableList.filter(table => hasMistake(table))
      
      // Add new batch with mistaken table(s) to BatchList
      selectedBatch && mistakenTables &&
        dispatch(
            addBatch({
              dayNumber: selectedBatch.dayNumber,
              reviewingDate: addDays(selectedBatch.reviewingDate, 1),
              tableList: mistakenTables
          })
        )
      
    }
  }

  // Buttons
  const buttons: LayoutButton[] = [
    {
      label: 'OK',
      onPress: () => {
        handleResults()
        navigation.navigate('Home')
      }
    }
  ]

  return (
    <MainLayout buttons={buttons}>

      <TableList results={true}/>

    </MainLayout>
  );
}
