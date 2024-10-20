import Colors from "@/constants/Colors";
import { LayoutButton } from "@/types/LayoutButton";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, Pressable, StyleSheet } from "react-native";

export default function BottomButton({label, onPress, icon, disabled, iconOnly, color } : LayoutButton){
    return (
        <Pressable 
            onPress={onPress} 
            style={({pressed}) => [
                styles.button, 
                disabled ? styles.disabled : styles.active,
                {backgroundColor: pressed ? 'grey' : (color ? color : Colors.primary)}
            ]} 
            disabled={disabled}
        >
            {icon && <MaterialIcons name={icon} size={40} color={'white'}/>}
            {label && <Text style={styles.text}>{label}</Text>}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#4A90E2',
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
        justifyContent: 'center',
        textTransform: 'uppercase'
        // fontFamily: 'Roboto'
    }
})