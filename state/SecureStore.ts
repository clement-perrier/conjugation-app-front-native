import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

async function SaveItemAsync(key: string, value: string) {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, value);
  } else {
    SecureStore.setItemAsync(key, value);
  }
}

async function GetItemAsync(key: string) {
  if (Platform.OS === 'web') {
    return localStorage.getItem(key);
  } else {
    return SecureStore.getItemAsync(key);
  }
}

const AppSecureStore = {SaveItemAsync, GetItemAsync}

export default AppSecureStore