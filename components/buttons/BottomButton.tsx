import { LayoutButton } from "@/types/LayoutButton";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, Pressable, StyleSheet } from "react-native";

export default function BottomButton({label, onPress, icon, disabled, iconOnly } : LayoutButton){
    return (
        <Pressable onPress={onPress} style={[styles.button, disabled ? styles.disabled : styles.active ]} disabled={disabled}>
            <MaterialIcons name={icon} size={40} color={'white'}/>
            <Text style={styles.text}>{label}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 45,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    widthFitContent: {
        width: 50
    },
    active: {
        backgroundColor: 'black',
    },
    disabled: {
        backgroundColor: 'grey',
        opacity: 0.3
    },
    text: {
        color: 'white',
        justifyContent: 'center'
    }
})