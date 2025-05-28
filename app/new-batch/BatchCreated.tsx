
import CustomFlatList from "@/components/layout/CustomFlatList";
import MainLayout from "@/components/layout/MainLayout";
import TableView from "@/components/table/TableView";
import Colors from "@/constants/Colors";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useAppSelector } from "@/state/hooks";
import { LayoutButton } from "@/types/LayoutButton";
import { Routes } from "@/types/RootStackParamList";
import { formatBatchTitle } from "@/utils/Date";
import { globalstyles } from "@/utils/GlobalStyle";
import { StyleSheet, View, Text } from "react-native";

export default function BatchCreated() {

  const navigation = useAppNavigation();
  
  // Selectors
  const selectedBatch = useAppSelector(state => state.SelectedBatch.value)

  //  Buttons
  const buttons: LayoutButton[] = [
    {
      label:'START',
      onPress:() => navigation.navigate(Routes.Question)
    }
  ]
  
  return (
    <MainLayout buttons={buttons} title={formatBatchTitle(selectedBatch)}>
      <CustomFlatList
          data={selectedBatch.tableList}
          isLoading={false}
          emptyMessage=""
          renderItem={({item, index}) => {
            return (
            //  <View style={{alignItems: 'center'}}>
                <View style={[globalstyles.tableContainer, styles.tableContainer]}>
                  <TableView table={item} isResult={false} key={index}/>
                </View>
            //  </View>
            )
          }}
          // contentContainerStyle={{alignItems: 'center', width: '100%'}}
      >
      </CustomFlatList>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    backgroundColor: Colors.tertiary,
    width: '100%'
  },
})
