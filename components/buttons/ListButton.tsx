import Colors from "@/constants/Colors";
import { LayoutButton } from "@/types/LayoutButton";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, Pressable, StyleSheet, View } from "react-native";

export default function ListButton({label, onPress, icon, disabled, focus } : LayoutButton){
    return (
        <Pressable 
            onPress={onPress} 
            disabled={disabled}
            style={({pressed}) => [
                styles.button, 
                disabled && styles.disabled, 
                focus && styles.focus,
                {backgroundColor: pressed ? 'grey' : Colors.secondary}
            ]}
        >
            <Text style={styles.text}>{label}</Text>
            <MaterialIcons name={icon} size={20} color={Colors.textSecondary} style={styles.icon}/>
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
        borderRadius: 10
    },
    listButton: {
        position: 'relative'
    },
    disabled: {
        opacity: 0.3,
        // borderColor: 'orange',
        // borderWidth: 3
    },
    focus: {
        // shadowColor: '#FFC107',
        // borderWidth: 1
    },
    text: {
        color: Colors.textSecondary,
    },
    icon: {
        position: 'absolute',
        right: 15
    }
})