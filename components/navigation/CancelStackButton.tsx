import { StackActions } from "@react-navigation/native"
import IconButton from "../buttons/IconButton"
import { StyleSheet } from "react-native"
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useAppDispatch } from "@/state/hooks";
import { clearSelectedTableList } from "@/state/slices/SelectedTableListSlice";

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
            style={styles.button}
        />
    )
    
}

const styles = StyleSheet.create({
    button: {
        height: '100%',
        top: 15,
        right: 11,
        zIndex: 4
    },
})