import Colors from "@/constants/Colors";
import Styles from "@/constants/Styles";
import { LayoutButton } from "@/types/LayoutButton";
import { globalstyles } from "@/utils/GlobalStyle";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, Pressable, StyleSheet } from "react-native";

export default function BottomButton({label, onPress, icon, disabled, iconOnly, color, iconSize = 40 } : LayoutButton){
    return (
        <Pressable 
            onPress={onPress} 
            style={({pressed}) => [
                styles.button, 
                globalstyles.flexRow,
                disabled ? styles.disabled : styles.active,
                {backgroundColor: pressed ? 'grey' : (color ? color : Colors.primary)}
            ]} 
            disabled={disabled}
        >
            {label && <Text style={styles.text}>{label}</Text>}
            {icon && <MaterialIcons name={icon} size={iconSize} color={'white'}/>}
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
        width: '100%',
        maxWidth: Styles.maxWidth
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
        textTransform: 'uppercase',
        fontSize: 16
        // fontFamily: 'Roboto'
    }
})