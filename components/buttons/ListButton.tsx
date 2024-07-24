import { LayoutButton } from "@/types/LayoutButton";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, Pressable, StyleSheet, View } from "react-native";

export default function ListButton({label, onPress, icon, disabled } : LayoutButton){
    return (
        <Pressable onPress={onPress} style={[styles.button, disabled ? styles.disabled : styles.active]} disabled={disabled}>
            <Text style={styles.text}>{label}</Text>

            <MaterialIcons name={icon} size={20} color={'white'} style={styles.icon}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        position: 'relative'
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
    },
    icon: {
        position: 'absolute',
        right: 15
    }
})