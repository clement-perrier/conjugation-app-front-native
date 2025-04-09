import { Platform } from "react-native";
import Toast from "react-native-toast-message";

export const handleFail = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    window.confirm(`${title}: ${message}`);
  } else {
    // TOAST SINGUP/LOGIN FAIL
    // Alert.alert(title, message, [{ text: 'OK' }]);
    Toast.show({
      type: 'error',
      text1: title,
      text2: message
    });
  }
};
  
export const handleSuccess = (title: string, message?: string) => {
  if (Platform.OS === 'web') {
    window.confirm(title);
  } else {
    // TOAST SINGUP/LOGIN FAIL
    // Alert.alert(title, message, [{ text: 'OK' }]);
    Toast.show({
      type: 'success',
      text1: title,
      text2: message
    });
  }
};

export const consoleError = (file: string, method: string, error: any) => console.error(`${file} - ${method}() failed ${error}`)