import { useAppNavigation } from '@/hooks/useAppNavigation';
import TableList from '@/components/layout/TableList';
import MainLayout from '@/components/layout/MainLayout';
import { LayoutButton } from '@/types/LayoutButton';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { hasCorrect, hasMistake } from '@/types/Table';
import { addBatch, updateBatchInfo } from '@/state/slices/BatchListSlice';
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

  // Handlers
  const handleResults = () => {

    if(allCorrect || allMistake){

      // Update Current Batch day number and reviewing date depending on day number
      // e.g. day number = 1 => dayNumber + 1 and reviewing date + 1, day number = 2 => dayNumber + 2 and reviewing date + 2
      selectedBatch && selectedBatch.id &&
        dispatch(
          updateBatchInfo({
            batchId: selectedBatch.id, 
            isCorrect: allCorrect
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
