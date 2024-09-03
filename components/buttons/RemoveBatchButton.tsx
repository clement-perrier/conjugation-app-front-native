import { RemoveBatch } from "@/services/ApiService";
import IconButton from "./IconButton"
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { removeBatch } from "@/state/slices/BatchListSlice";
import { globalstyles } from "@/utils/GlobalStyle";
import { Alert, Platform } from "react-native";
import Colors from "@/constants/Colors";

export default function RemoveBatchButton() {

    const dispatch = useAppDispatch()
    const navigation = useAppNavigation();

    // Selectors
    const selectedBatch = useAppSelector(state => state.SelectedBatch.value)
    
    const handlePress = () => {
        if (Platform.OS === 'web') {
            // Use a different method for web, such as the browser's confirm dialog
            if (window.confirm("Are you sure you want to delete this set?")) {
                // Proceed with the delete action
                selectedBatch.id &&
                    (
                        RemoveBatch(selectedBatch.id),
                        dispatch(removeBatch(selectedBatch.id))
                    );
                navigation.navigate('Home');
            }
        } else {
            // Use Alert.alert for Android and iOS
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
                            selectedBatch.id &&
                                (
                                    RemoveBatch(selectedBatch.id),
                                    dispatch(removeBatch(selectedBatch.id))
                                );
                            navigation.navigate('Home');
                        }
                    }
                ]
            );
        }
    };

    return (
        <IconButton 
            icon={'delete'}
            size={30}
            color={Colors.error}
            onPress={handlePress}
            style={[globalstyles.headerButton, globalstyles.headerLefttButton]}
        />
    )
    
}
