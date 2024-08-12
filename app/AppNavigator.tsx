import { createStackNavigator } from "@react-navigation/stack";
import TenseSelection from "./new-batch/TenseSelection";
import VerbSelection from "./new-batch/VerbSelection";
import BatchProgress from "./new-batch/BatchProgress";
import BatchCreated from "./new-batch/BatchCreated";
import Home from "./Home";
import CancelStackButton from "@/components/navigation/CancelStackButton";
import { store } from "@/state/store";
import { Provider } from "react-redux";
import { View } from "react-native";
import Question from "./training/Question";
import Results from "./training/Results";
import Start from "./training/Start";
import { ConnectivityProvider } from "@/utils/ConnectivityProvider";
import LearningLanguageList from "./learning-language-settings/LearningLanguageList";
import AddLearningLanguage from "./learning-language-settings/AddLearningLanguage";
import { useAppSelector } from "@/state/hooks";
import IconButton from "@/components/buttons/IconButton";
import RemoveBatchButton from "@/components/buttons/RemoveBatchButton";

const Stack = createStackNavigator();

export default function AppNavigator({ initialRouteName } : {initialRouteName: string}) {

  // selectors
  const isOnboarding = useAppSelector(state => state.IsOnBoarding.value)

  return (
    <Provider store={store}>
      {/* <ConnectivityProvider> */}
        <View style={{flex: 1}}>
          <Stack.Navigator initialRouteName={initialRouteName}>
            <Stack.Screen  name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen 
              name="Learning language list"
              component={LearningLanguageList}
              options={{ 
                headerLeft: () => null,
                headerRight: () => <CancelStackButton/>,
                headerBackground: () => <View></View>,
                headerTitle: ''
              }}
            />
            <Stack.Screen 
              name="Add learning language"
              component={AddLearningLanguage}
              options={{ 
                headerRight: () => !isOnboarding && <CancelStackButton/>,
                headerBackground: () => <View></View>,
                headerTitle: ''
              }}
            />
            <Stack.Screen 
              name="Tense(s) selection"
              component={TenseSelection}
              options={{ 
                headerRight: () => <CancelStackButton selectionToBeCleared={true}/>,
                headerBackground: () => <View></View>,
                headerTitle: ''
              }}
            />
            <Stack.Screen 
              name="Verb(s) selection" 
              component={VerbSelection}
              options={{ 
                headerRight: () => <CancelStackButton selectionToBeCleared={true}/>,
                headerBackground: () => <View></View>,
                headerTitle: ''
              }}
            />
            <Stack.Screen 
              name="Batch progress"  
              component={BatchProgress}
              options={{ 
                headerLeft: () => null,
                headerRight: () => <CancelStackButton selectionToBeCleared={true}/>,
                headerBackground: () => <View></View>,
                headerTitle: ''
              }}
            />
            <Stack.Screen 
              name="Batch created"
              component={BatchCreated} 
              options={{   
                headerLeft: () => null,
                headerRight: () => <CancelStackButton/>,
                headerBackground: () => <View></View>,
                headerTitle: ''
              }}
            />
            <Stack.Screen 
              name="Start"
              component={Start} 
              options={{   
                headerLeft: () => <RemoveBatchButton/>,
                headerRight: () => <CancelStackButton/>,
                headerBackground: () => <View></View>,
                headerTitle: ''
              }}
            />
            <Stack.Screen 
              name="Question" 
              component={Question}
              options={{ 
                headerLeft: () => null,
                headerRight: () => <CancelStackButton/>,
                headerBackground: () => <View></View>,
                headerTitle: ''
              }}
            />
            <Stack.Screen 
              name="Results" 
              component={Results}
              options={{ 
                headerLeft: () => null,
                headerRight: () => <CancelStackButton/>,
                headerBackground: () => <View></View>,
                headerTitle: ''
              }}
            />

          </Stack.Navigator>
        </View>
      {/* </ConnectivityProvider> */}
    </Provider>
  );
}


