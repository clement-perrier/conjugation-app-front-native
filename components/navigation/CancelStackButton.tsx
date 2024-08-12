import { StackActions } from "@react-navigation/native"
import IconButton from "../buttons/IconButton"
import { StyleSheet } from "react-native"
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useAppDispatch } from "@/state/hooks";
import { clearSelectedTableList } from "@/state/slices/SelectedTableListSlice";
import { globalstyles } from "@/utils/GlobalStyle";

export default function CancelStackButton({selectionToBeCleared} : {selectionToBeCleared?: boolean}) {

    const dispatch = useAppDispatch()
    const navigation = useAppNavigation();

    const handlePress = () => {
        selectionToBeCleared && dispatch(clearSelectedTableList())
        navigation.navigate('Home')
    }

    return (
        <IconButton 
            icon={'close'}
            size={30}
            onPress={handlePress}
            style={[globalstyles.headerButton, globalstyles.headerRightButton]}
        />
    )
    
}