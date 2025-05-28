import TenseSelection from "./new-batch/TenseSelection";
import VerbSelection from "./new-batch/VerbSelection";
import BatchProgress from "./new-batch/BatchProgress";
import BatchCreated from "./new-batch/BatchCreated";
import Home from "./Home";
import { Linking, Platform, StatusBar, View } from "react-native";
import Question from "./training/Question";
import Results from "./training/Results";
import Start from "./training/Start";
import LearningLanguageList from "./learning-language-settings/LearningLanguageList";
import AddLearningLanguage from "./learning-language-settings/AddLearningLanguage";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import IconButton from "@/components/buttons/IconButton";
import RemoveBatchButton from "@/components/buttons/RemoveBatchButton";
import { StyleSheet } from "react-native";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { clearSelectedTableList } from "@/state/slices/SelectedTableListSlice";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from "react";
import LogIn from "./authentication/LogIn";
import SignUp from "./authentication/SignUp";
import NewPassword from "./authentication/NewPassword";
import { updateIsOnBoarding } from "@/state/slices/isOnBoardingSlice";
import { checkAuth } from "@/services/AuthenticationService";
import Spinner from "@/components/layout/Spinner";
import PasswordResetRequest from "./authentication/PasswordResetRequest";
import NetInfo, { NetInfoChangeHandler, NetInfoState } from "@react-native-community/netinfo";
import { CustomAlert } from "@/utils/CustomAlert";
import { requestNotificationPermission, updateDeviceToken } from "@/services/NotificationService";
import Offline from "./Offline";
import TutorialScreen from "./tutorial/Tutorial";
// import {firebase} from "@react-native-firebase/messaging";
// import { FIREBASE_CONFIG } from "@/constants/Configuration";
import React from "react";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import Styles from "@/constants/Styles";
import Settings from "./settings/Settings";
import { globalstyles } from "@/utils/GlobalStyle";
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { CopilotProvider } from "react-native-copilot";
import { Routes } from "@/types/RootStackParamList";

const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();

export default function AppNavigator() {

  const dispatch = useAppDispatch()

  // States
  const [isOffline, setIsOffline] = useState(false)

  // Selectors
  const isOnboarding = useAppSelector(state => state.IsOnBoarding.value)
  const isAuthenticated = useAppSelector(state => state.IsAuthenticated.value)
  const user = useAppSelector(state => state.User.value);
  const isUserLoading = useAppSelector(state => state.User.loading)

  // Handlers
  const handleNetworkChange: NetInfoChangeHandler = (state: NetInfoState) => {
    // if(!state.isConnected){
    //   setIsOffline(true)
    //   if(isAuthenticated) {
    //     CustomAlert('No internet connection', 'Please reconnect to the internet to ensure that your changes are saved', () => {})
    //   } else {
    //     CustomAlert('No internet connection', 'Please reconnect to the internet to properly use the app', () => {})
    //   }
    // }
    state.isConnected ? setIsOffline(false) : setIsOffline(true)
  };

  // Constants
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  const contentStyle = {backgroundColor: 'white'}

  // Functions
  const getOptions = (
                        previousButton?: boolean, 
                        cancelButton?: boolean, 
                        selectionToBeCleared?: boolean, 
                        removeBatchButton?: boolean,
                        headerPaddingBottom?: boolean
                      ) : NativeStackNavigationOptions => {
    return {
      animation: 'simple_push',
      header: () => <CustomHeader 
                      previousButton={previousButton}
                      cancelButton={cancelButton}
                      selectionToBeCleared={selectionToBeCleared}
                      removeBatchButton={removeBatchButton}
                      headerPaddingBottom={headerPaddingBottom}
                    />,
                    
                    // contentStyle: {padding: 20, backgroundColor: 'white', alignItems: 'center'},
                    // contentStyle: {padding: 20}, 
      // transitionSpec: {
      //   open: config,
      //   close: config,
      // },
    }
  }

  // Effects
  useEffect(() => {

    // Initialize network listener (checking if online/offline)
    const netInfoSubscription = NetInfo.addEventListener(handleNetworkChange);

    // Check if user already connected
    checkAuth(dispatch);  

    return () => {
        netInfoSubscription && netInfoSubscription();
    };
    
  }, []);

  useEffect(() => {

    // Update device token and listening to firebase push notification
    // user && requestNotificationPermission(user.id)

    // if (user?.defaultLearningLanguage === null) {
    //   dispatch(updateIsOnBoarding(true));
    //   console.log('hey')
    // }
  }, [user]);

  if (isAuthenticated === null) {
    return <Spinner text={'Logging in'}/>
  }

  if (isUserLoading) return <Spinner text={'Loading user'}/>

  return (
    <>
      <StatusBar barStyle="dark-content" translucent backgroundColor={'transparent'} />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ flex: 1, width: '100%', maxWidth: Styles.maxWidth }}>
          {
            isOffline ? 
              <Stack.Navigator screenOptions={{ contentStyle }}>
                <Stack.Screen
                  name={Routes.Offline}
                  component={Offline}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            :
            isAuthenticated ? (
              user?.defaultLearningLanguage ? (
                <Stack.Navigator initialRouteName={Routes.Home} screenOptions={{ contentStyle }}>
                  <Stack.Screen name={Routes.Home} component={Home} options={{ headerShown: false }} />
                  <Stack.Screen name={Routes.Settings} component={Settings} options={getOptions(true)} />
                  <Stack.Screen name={Routes.LearningLanguageList} component={LearningLanguageList} options={getOptions(true)} />
                  <Stack.Screen name={Routes.AddLearningLanguage} component={AddLearningLanguage} options={getOptions(true, true)} />
                  <Stack.Screen name={Routes.TenseSelection} component={TenseSelection} options={getOptions(true, false)} />
                  <Stack.Screen name={Routes.VerbSelection} component={VerbSelection} options={getOptions(true, true, true)} />
                  <Stack.Screen name={Routes.BatchProgress} component={BatchProgress} options={getOptions(false, true, true)} />
                  <Stack.Screen name={Routes.BatchCreated} component={BatchCreated} options={getOptions(false, true)} />
                  <Stack.Screen name={Routes.Start} component={Start} options={getOptions(true, false, false, true)} />
                  <Stack.Screen name={Routes.Question} component={Question} options={getOptions(false, true)} />
                  <Stack.Screen name={Routes.Results} component={Results} options={getOptions(false, true)} />
                  <Stack.Screen name={Routes.Tutorial} component={TutorialScreen} options={getOptions(true, true)} />
                </Stack.Navigator>
              ) : (
                <Stack.Navigator initialRouteName={Routes.OnBoardingTutorial} screenOptions={{ contentStyle }}>
                  {/* <Stack.Screen name={Routes.OnBoardingTutorial} component={TutorialScreen} options={getOptions()} /> */}
                  <Stack.Screen name={Routes.OnBoardingLearningLanguage} component={AddLearningLanguage} options={getOptions()} />
                </Stack.Navigator>
              )
            ) : (
              <Stack.Navigator initialRouteName={Routes.Login} screenOptions={{ contentStyle }}>
                <Stack.Screen name={Routes.Login} component={LogIn} options={getOptions()} />
                <Stack.Screen name={Routes.Signup} component={SignUp} options={getOptions()} />
                <Stack.Screen name={Routes.ResetPasswordRequest} component={PasswordResetRequest} options={getOptions(true, false)} />
                <Stack.Screen name={Routes.NewPassword} component={NewPassword} options={getOptions(false, true)} />
              </Stack.Navigator>
            )
          }
        </View>
      </View>
    </>
  );
}



export function CustomHeader(
  {
    previousButton, 
    cancelButton, 
    selectionToBeCleared, 
    removeBatchButton,
    headerPaddingBottom
  } 
    :
  {
    previousButton?: boolean,
    cancelButton?: boolean,
    selectionToBeCleared?: boolean, 
    removeBatchButton?: boolean,
    headerPaddingBottom?: boolean
  }
){

  return (
    <View style={[styles.header, headerPaddingBottom && {paddingBottom: 15}]}>
      {previousButton ? <BackButton/> : <View/>}
      {!cancelButton && removeBatchButton && <RemoveBatchButton/>}
      {cancelButton && <CancelStackButton selectionToBeCleared={selectionToBeCleared}/>}
    </View>
  );
    
}

export function BackButton(){

  const navigation = useAppNavigation();

  return (
    <View style={{justifyContent: 'center'}}>
        <IconButton 
            icon='arrow-back'
            size={30} // Adjust size to match default button icon size
            onPress={() => navigation.goBack()}
            style={globalstyles.headerButton}
        />
    </View>
  )
    
}

function CancelStackButton({selectionToBeCleared} : {selectionToBeCleared?: boolean}) {

  const dispatch = useAppDispatch()
  const navigation = useAppNavigation();

  const handlePress = () => {
      selectionToBeCleared && dispatch(clearSelectedTableList())
      navigation.navigate(Routes.Home)
  }

  return (
      <View>
        <IconButton 
            icon='close'
            size={Styles.headerIconSize} 
            onPress={handlePress}
            style={globalstyles.headerButton}
        />
      </View>
  )
  
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    elevation: 0, // Remove elevation (for Android)
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})