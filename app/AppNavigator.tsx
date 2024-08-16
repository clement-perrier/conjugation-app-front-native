import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import TenseSelection from "./new-batch/TenseSelection";
import VerbSelection from "./new-batch/VerbSelection";
import BatchProgress from "./new-batch/BatchProgress";
import BatchCreated from "./new-batch/BatchCreated";
import Home from "./Home";
import { store } from "@/state/store";
import { Provider } from "react-redux";
import { StatusBar, Text, View } from "react-native";
import Question from "./training/Question";
import Results from "./training/Results";
import Start from "./training/Start";
import { ConnectivityProvider } from "@/utils/ConnectivityProvider";
import LearningLanguageList from "./learning-language-settings/LearningLanguageList";
import AddLearningLanguage from "./learning-language-settings/AddLearningLanguage";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import IconButton from "@/components/buttons/IconButton";
import RemoveBatchButton from "@/components/buttons/RemoveBatchButton";
import { StyleSheet } from "react-native";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { clearSelectedTableList } from "@/state/slices/SelectedTableListSlice";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();

export default function AppNavigator({ initialRouteName } : {initialRouteName: string}) {

  // Selectors
  const isOnboarding = useAppSelector(state => state.IsOnBoarding.value)

  const getOptions = (previousButton?: boolean, cancelButton?: boolean, selectionToBeCleared?: boolean, removeBatchButton?: boolean) => {
    return {
      header: () => <CustomHeader 
                      previousButton={previousButton}
                      cancelButton={cancelButton}
                      selectionToBeCleared={selectionToBeCleared}
                      removeBatchButton={removeBatchButton}
                    />
                    // statusBarColor: 'pink'
      // statusBarHidden: true,
      // headerShowm: false
      // headerStyle: styles.header,
      // headerTitle: '',
      // headerBackTitleVisible: false,
      // headerLeft: noPreviousButton ? () => (removeBatchButton ? <RemoveBatchButton/> : null) : undefined,
      // headerRight: () => (cancelButton && !isOnboarding) && <CancelStackButton selectionToBeCleared={selectionToBeCleared}/>,
    }
  }

  return (
   <>
        {/* <ConnectivityProvider> */}
        
          <View style={{flex: 1}}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
            <Stack.Navigator initialRouteName={initialRouteName}>
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
          </View>
        {/* </ConnectivityProvider> */}
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

  const dispatch = useAppDispatch()
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
    // paddingHorizontal: 15,
  }
})