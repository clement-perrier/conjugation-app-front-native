import { NavigationProp, StackActions } from "@react-navigation/native"
import { RootStackParamList } from "@/types/RootStackParamList"
import IconButton from "./IconButton"
import { StyleSheet } from "react-native"

export default function CancelStackButton({ navigation } : { navigation: NavigationProp<RootStackParamList> }) {
   return (
    <IconButton 
        icon={'close'}
        size={30}
        onPress={() => navigation.dispatch(StackActions.popToTop())}
        style={styles.button}
    />
   )
}

const styles = StyleSheet.create({
    button: {
        height: '100%',
        top: 0,
        right: 11,
        zIndex: 4
    },
})