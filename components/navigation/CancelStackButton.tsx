import IconButton from "../buttons/IconButton"
import { StyleSheet, View } from "react-native"
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useAppDispatch } from "@/state/hooks";
import { clearSelectedTableList } from "@/state/slices/SelectedTableListSlice";

export default function CancelStackButton({selectionToBeCleared} : {selectionToBeCleared?: boolean}) {

    const dispatch = useAppDispatch()
    const navigation = useAppNavigation();

    const handlePress = () => {
        selectionToBeCleared && dispatch(clearSelectedTableList())
        navigation.popToTop()
    }

    return (
        <View style={styles.buttonContainer}>
            <IconButton 
                icon='close'
                size={26} // Adjust size to match default button icon size
                onPress={handlePress}
                style={styles.iconButton}
            />
        </View>
    )
    
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginRight: 15,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: 26
    },
    iconButton: {
        // padding: 5,  
    },
});