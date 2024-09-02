import MainLayout from "@/components/layout/MainLayout";
import TableList from "@/components/layout/TableList";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useAppSelector } from "@/state/hooks";
import { LayoutButton } from "@/types/LayoutButton";
import { formatBatchTitle } from "@/utils/Date";
import { useEffect } from "react";

export default function BatchCreated() {

  const navigation = useAppNavigation();
  
  // Selectors
  const selectedBatch = useAppSelector(state => state.SelectedBatch.value)

  //  Buttons
  const buttons: LayoutButton[] = [
    {
      label:'START',
      onPress:() => navigation.navigate('Question')
    }
  ]

  return (
    <MainLayout buttons={buttons} title={formatBatchTitle(selectedBatch)}>

        <TableList results={false}/>
        
    </MainLayout>
  );
}
