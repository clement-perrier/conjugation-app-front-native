import { LayoutButton } from "@/types/LayoutButton";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, Pressable, StyleSheet } from "react-native";

export default function BottomButton({button} : {button: LayoutButton}){
    return (
        <Pressable onPress={button.onPress} style={[styles.button, button.disabled ? styles.disabled : styles.active]} disabled={button.disabled}>
            <MaterialIcons name={button.icon} size={40} color={'white'}/>
            <Text style={styles.text}>{button.label}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 10
    },
    active: {
        backgroundColor: 'black',
    },
    disabled: {
        backgroundColor: 'grey',
        opacity: 0.3
    },
    text: {
        color: 'white'
    }
})