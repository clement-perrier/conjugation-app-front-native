import { Alert, Platform } from "react-native";

export const CustomAlert = (title: string, message: string, action: () => void) => {
    
    if (Platform.OS === 'web') {
        // Use a different method for web, such as the browser's confirm dialog
        if (window.confirm(message)) {
            // Proceed with the delete action
            action()
        }
    } else {
        // Use Alert.alert for Android and iOS
        Alert.alert(
            title,
            message,
            [
                {
                    text: "Cancel",
                },
                {
                    text: "OK",
                    onPress: action
                }
            ]
        );
    }
}