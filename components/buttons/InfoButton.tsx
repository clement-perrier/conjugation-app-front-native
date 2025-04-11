import Colors from '@/constants/Colors';
import { StyleSheet, Text, Pressable, View } from 'react-native';

interface InfoButtonProps {
    size: number,
    handlePress: () => void
}
export default function InfoButton({handlePress, size} : InfoButtonProps) {

    const halfSize = Math.floor(size / 1.7)
    const style = {height: size, width: size, borderRadius: halfSize}

    return (
        <Pressable onPress={handlePress} style={{padding: 10, paddingRight: 0}}>
            <View style={[styles.innerCircle, style]}>
                <Text style={[styles.iconText, {fontSize: halfSize}]}>i</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    innerCircle: { 
        backgroundColor: Colors.secondary, // Background inside the circle (teal as example)
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.tertiary
    },
    iconText: {
        color: Colors.textPrimary, // Icon text color (navy blue as example)
        fontWeight: 'bold',
    },
});
