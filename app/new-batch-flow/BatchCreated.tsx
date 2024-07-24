import MainLayout from "@/components/layout/MainLayout";
import TableList from "@/components/TableList";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useAppSelector } from "@/state/hooks";
import { LayoutButton } from "@/types/LayoutButton";
import { useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { StyleSheet } from "react-native";

export default function BatchCreated() {

  const navigation = useAppNavigation();

  const selectedBatch = useAppSelector(state => state.SelectedBatch.value);

  useEffect(() => {
    console.log(selectedBatch)
  },[selectedBatch])

  //  Buttons
  const buttons: LayoutButton[] = [
    {
      label:'START',
      onPress:() => navigation.navigate('Question')
    }
  ]

  return (
    <MainLayout buttons={buttons}>
        <TableList results={false}/>
    </MainLayout>
  );
}
