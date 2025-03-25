import { CustomAlert } from '@/utils/CustomAlert';
// import {firebase} from "@react-native-firebase/messaging";
// import { initializeApp } from "firebase/app"
// import messaging from '@react-native-firebase/messaging';
import Constants from 'expo-constants';
// import { Linking } from 'react-native';
import * as Linking from 'expo-linking';
// import { Platform } from 'react-native';
import { User } from '@/types/User';
import { UpdateUserDeviceToken } from './ApiService';
import { Alert } from 'react-native';
import { NOTIFICATION_PERMISSION_ASKED } from '@/constants/Configuration';
import AppSecureStore from '@/state/SecureStore';
import * as Notifications from 'expo-notifications';
import { FIREBASE_CONFIG } from "@/constants/Configuration";

// async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//   }
// }

// Function to register the background message handler conditionally
// export function setupBackgroundMessageHandler() {
//   if (!isExpo && Platform.OS !== 'web') {
//     // Register background message handler for non-Expo and non-web environments
//     // messaging().setBackgroundMessageHandler(async remoteMessage => {
//     //   console.log('Message handled in the background!', remoteMessage);
//     //   // Handle background message
//     // });
//   } else {
//     console.log('Background message handler not set. Running in Expo or on web.');
//   }
// }

export async function updateDeviceToken (userId: number){

  const deviceToken = await AppSecureStore.GetItemAsync('device_token');

  if(deviceToken === null || deviceToken === '') {

    const { data: token } = await Notifications.getExpoPushTokenAsync();

    if (token && userId) {
      console.log('Expo push token:', token);
      AppSecureStore.SaveItemAsync('device_token', token);
      // Update user device token on your backend
      UpdateUserDeviceToken(userId, token);
    } else {
      console.log('No registration token available. Request permission to send push messages.');
    }

    // import('@react-native-firebase/messaging').then((firebaseMessaging) => {

    // firebaseMessaging.firebase.initializeApp(FIREBASE_CONFIG);
      
    // const messaging = firebaseMessaging.default

    // messaging().getToken().then(function(currentToken) {
    //   if (currentToken && userId) {
    //       console.log('FCM registration token: ', currentToken);
    //       AppSecureStore.SaveItemAsync('device_token', currentToken);
    //       // Update user device token
    //       UpdateUserDeviceToken(userId, currentToken)
    //   } else {
    //       // Show permission request UI
    //       console.log('No registration token available. Request permission to send push messages.');
    //       return null
    //   }
    // })
    // .catch(function(err) {
    //     console.error('Unable to retrieve registration token ', err);
    //     return null
    // });

    // });
    
      
  }

}

// Function to check and request notification permissions
export async function requestNotificationPermission(userId: number | undefined) {

  const initialUrl =  await Linking.getInitialURL();
  const invalidUrls = ['exp://', 'localhost'];

  if (!invalidUrls.some(url => initialUrl?.includes(url))) {

    const alreadyAsked = await AppSecureStore.GetItemAsync(NOTIFICATION_PERMISSION_ASKED);

    if (alreadyAsked != 'true') {

      const { status } = await Notifications.getPermissionsAsync();

      if(status === 'denied') {

        import('react-native').then((reactNative) => {

          const platform = reactNative.Platform

          Alert.alert(
            'Enable Notifications',
            'Notifications are currently disabled. To receive reminders for conjugations that are due, please enable notifications in your settings.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => AppSecureStore.SaveItemAsync(NOTIFICATION_PERMISSION_ASKED, 'true')
              },
              {
                text: 'Open Settings',
                onPress: () => {
                  if (platform.OS === 'ios') {
                    AppSecureStore.SaveItemAsync(NOTIFICATION_PERMISSION_ASKED, 'true');
                    Linking.openURL('app-settings:');
                  } else {
                    AppSecureStore.SaveItemAsync(NOTIFICATION_PERMISSION_ASKED, 'true');
                    Linking.openSettings();
                  }
  
                }
              }
            ]
          );

        })


      }

    }

    // AppSecureStore.SaveItemAsync('device_token', '')
    userId && updateDeviceToken(userId)

  }

  
}


