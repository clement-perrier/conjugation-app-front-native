import TenseSelection from "./new-batch/TenseSelection";
import VerbSelection from "./new-batch/VerbSelection";
import BatchProgress from "./new-batch/BatchProgress";
import BatchCreated from "./new-batch/BatchCreated";
import Home from "./Home";
import { StatusBar, View } from "react-native";
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
import {firebase} from "@react-native-firebase/messaging";
import { FIREBASE_CONFIG } from "@/constants/Configuration";

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

  // Handlers
  const handleNetworkChange: NetInfoChangeHandler = (state: NetInfoState) => {
    if(!state.isConnected){
      setIsOffline(true)
      if(isAuthenticated) {
        CustomAlert('No internet connection', 'Please reconnect to the internet to ensure that your changes are saved', () => {})
      } else {
        CustomAlert('No internet connection', 'Please reconnect to the internet to properly use the app', () => {})
      }
    }
  };

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

  // Functions
  const getOptions = (previousButton?: boolean, cancelButton?: boolean, selectionToBeCleared?: boolean, removeBatchButton?: boolean) => {
    return {
      header: () => <CustomHeader 
                      previousButton={previousButton}
                      cancelButton={cancelButton}
                      selectionToBeCleared={selectionToBeCleared}
                      removeBatchButton={removeBatchButton}
                    />,
      transitionSpec: {
        open: config,
        close: config
      }
    }
  }

  // Effects
  useEffect(() => {

    // Initialize Firebase
    firebase.initializeApp(FIREBASE_CONFIG);

    const netInfoSubscription = NetInfo.addEventListener(handleNetworkChange);

    //  Check if user already connected
    checkAuth(dispatch);  

    return () => {
        netInfoSubscription && netInfoSubscription();
    };
    
  }, []);

  useEffect(() => {

    // Update device token and listening to firebase push notification
    user && requestNotificationPermission(user.id)

    if (user?.defaultLearningLanguage === null) {
      dispatch(updateIsOnBoarding(true));
    }
  }, [user]);

  if (isAuthenticated === null || (isAuthenticated === true && user === null)) {
    return <Spinner text={isAuthenticated === null ? 'Authenticating' : 'Loading user'}/>
  }
  
  return (
   <>
      <StatusBar barStyle="dark-content" translucent backgroundColor={'transparent'} />

      <View style={{flex: 1}}>
          {
            isAuthenticated ? (
              user?.defaultLearningLanguage ? (
                <Stack.Navigator initialRouteName="Home">
                {/* <Stack.Navigator initialRouteName="Tense(s) selection"> */}
                  <Stack.Screen  name="Home" component={Home} options={{ headerShown: false}} />
                  <Stack.Screen 
                    name="Learning language list"
                    component={LearningLanguageList}
                    options={getOptions(true)}
                  />
                  <Stack.Screen 
                    name="Add learning language"
                    component={AddLearningLanguage}
                    options={getOptions(true, true)}
                  />
                  <Stack.Screen 
                    name="Tense(s) selection"
                    component={TenseSelection}
                    options={getOptions(true, false)}
                  />
                  <Stack.Screen 
                    name="Verb(s) selection" 
                    component={VerbSelection}
                    options={getOptions(true, true, true)}
                  />
                  <Stack.Screen 
                    name="Batch progress"  
                    component={BatchProgress}
                    options={getOptions(false, true, true)}
                  />
                  <Stack.Screen 
                    name="Batch created"
                    component={BatchCreated} 
                    options={getOptions(false, true)}
                  />
                  <Stack.Screen 
                    name="Start"
                    component={Start} 
                    options={getOptions(true, false, false, true)}
                  />
                  <Stack.Screen 
                    name="Question" 
                    component={Question}
                    options={getOptions(false, true)}
                  />
                  <Stack.Screen 
                    name="Results" 
                    component={Results}
                    options={getOptions(false, false)}
                  /> 
                </Stack.Navigator>
              ) : (
                <Stack.Navigator>
                  {
                    isOffline 
                      ?
                        <Stack.Screen 
                          name="Offline"
                          component={Offline}
                          options={getOptions()}
                        />
                      :
                        <>
                          <Stack.Screen 
                            name="Tutorial"
                            component={TutorialScreen}
                            options={getOptions()}
                          />
                          <Stack.Screen 
                            name="On boarding learning language"
                            component={AddLearningLanguage}
                            options={getOptions()}
                          />
                        </>
                  }
                </Stack.Navigator>
              )
            ) : (
              <Stack.Navigator initialRouteName={isOnboarding ? 'Sign up' : 'Log in'}>
                <Stack.Screen 
                  name="Log in" 
                  component={LogIn}
                  options={getOptions()}
                /> 
                <Stack.Screen 
                  name="Sign up" 
                  component={SignUp}
                  options={getOptions()}
                /> 
                <Stack.Screen 
                  name="Reset password request" 
                  component={PasswordResetRequest}
                  options={getOptions(true, false)}
                />
                <Stack.Screen 
                  name="New password" 
                  component={NewPassword}
                  options={getOptions(false, true)}
                />
              </Stack.Navigator>
            )
          }
      </View>
    </>
  );
}

export function CustomHeader(
  {previousButton, cancelButton, selectionToBeCleared, removeBatchButton} : 
  {previousButton?: boolean, cancelButton?: boolean, selectionToBeCleared?: boolean, removeBatchButton?: boolean}
){

  return (
    <View style={styles.header}>
      {previousButton ? <BackButton/> : <View/>}
      {!cancelButton && removeBatchButton && <RemoveBatchButton/>}
      {cancelButton && <CancelStackButton selectionToBeCleared={selectionToBeCleared}/>}
    </View>
  );
    
}

export function BackButton(){

  const navigation = useAppNavigation();

  return (
          <View>
              <IconButton 
                  icon='arrow-back'
                  size={26} // Adjust size to match default button icon size
                  onPress={() => navigation.goBack()}
                  style={{}}
              />
          </View>
  )
    
}

function CancelStackButton({selectionToBeCleared} : {selectionToBeCleared?: boolean}) {

  const dispatch = useAppDispatch()
  const navigation = useAppNavigation();

  const handlePress = () => {
      selectionToBeCleared && dispatch(clearSelectedTableList())
      navigation.navigate('Home')
  }

  return (
      <View>
        <IconButton 
            icon='close'
            size={26} // Adjust size to match default button icon size
            onPress={handlePress}
            style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}
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
    paddingBottom: 15
  }
})