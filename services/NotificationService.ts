import { CustomAlert } from '@/utils/CustomAlert';
import {firebase} from "@react-native-firebase/messaging";
import { initializeApp } from "firebase/app"
import messaging from '@react-native-firebase/messaging';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { User } from '@/types/User';
import { UpdateUserDeviceToken } from './ApiService';

const isExpo = Constants.AppOwnership === 'expo';
const isStandalone  = Constants.executionEnvironment === 'standalone';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

// Function to register the background message handler conditionally
export function setupBackgroundMessageHandler() {
  if (!isExpo && Platform.OS !== 'web') {
    // Register background message handler for non-Expo and non-web environments
    // messaging().setBackgroundMessageHandler(async remoteMessage => {
    //   console.log('Message handled in the background!', remoteMessage);
    //   // Handle background message
    // });
  } else {
    console.log('Background message handler not set. Running in Expo or on web.');
  }
}

export function updateDeviceToken(userId: number){
  console.log(isExpo)
  if(isStandalone && Platform.OS !== 'web'){
    console.log('ccd')
    firebase.messaging().getToken()
    .then(function(currentToken) {
        if (currentToken) {
            console.log('FCM registration token: ', currentToken);
            // Update user device token
            UpdateUserDeviceToken(userId, currentToken)
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to send push messages.');
        }
    })
    .catch(function(err) {
        console.error('Unable to retrieve registration token ', err);
    });

    // requestUserPermission()

  } 

}
