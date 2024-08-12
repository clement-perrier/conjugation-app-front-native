import IconButton from "./IconButton"
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { removeBatch } from "@/state/slices/BatchListSlice";
import { globalstyles } from "@/utils/GlobalStyle";
import { Alert } from "react-native";

export default function RemoveBatchButton() {

    const dispatch = useAppDispatch()
    const navigation = useAppNavigation();

    // Selectors
    const selectedBatch = useAppSelector(state => state.SelectedBatch.value)
    
    const handlePress = () => {

        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this set?",
            [
                {
                    text: "Cancel",
                },
                {
                    text: "OK",
                    onPress: () => {
                        // Proceed with the delete action
                        selectedBatch.id && dispatch(removeBatch(selectedBatch.id))
                        navigation.navigate('Home')
                    }
                }
            ]
        );

    };

    return (
        <IconButton 
            icon={'delete'}
            size={30}
            color="red"
            onPress={handlePress}
            style={[globalstyles.headerButton, globalstyles.headerLefttButton]}
        />
    )
    
}
