import { createStackNavigator } from "@react-navigation/stack";
import TenseSelection from "./new-batch/TenseSelection";
import VerbSelection from "./new-batch/VerbSelection";
import BatchProgress from "./new-batch/BatchProgress";
import BatchCreated from "./new-batch/BatchCreated";
import Home from "./Home";
import { useAppNavigation } from "@/hooks/useAppNavigation";
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

const Stack = createStackNavigator();

export default function App() {

  const navigation = useAppNavigation();

  return (
    <Provider store={store}>
      {/* <ConnectivityProvider> */}
        <View style={{flex: 1}}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen  name="Home"component={Home} options={{ headerShown: false }} />
            {/* No header style neither title */}
            <Stack.Group
              screenOptions={{
                headerRight: () => <CancelStackButton/>,
                headerBackground: () => <View></View>,
                headerTitle: ''
              }}
            >
              {/* With back button */}
              <Stack.Screen 
                name="Add learning language"
                component={AddLearningLanguage}
              />
              <Stack.Screen 
                name="Tense(s) selection"
                component={TenseSelection}
                options={{ 
                  headerRight: () => <CancelStackButton selectionToBeCleared={true}/>
                }}
              />
              <Stack.Screen 
                name="Verb(s) selection" 
                component={VerbSelection}
                options={{ 
                  headerRight: () => <CancelStackButton selectionToBeCleared={true}/>
                }}
              />

              <Stack.Group
                screenOptions={{
                  headerLeft: () => null
                }}
              >
                {/* No back button */}
                <Stack.Screen 
                  name="Learning language list"
                  component={LearningLanguageList}
                />
                <Stack.Screen 
                  name="Batch created"
                  component={BatchCreated}
                />
                <Stack.Screen 
                  name="Start"
                  component={Start}
                />
                <Stack.Screen 
                  name="Question" 
                  component={Question}
                />
                <Stack.Screen 
                  name="Results" 
                  component={Results}
                />
                <Stack.Screen 
                  name="Batch progress"  
                  component={BatchProgress}
                  options={{ 
                    headerRight: () => <CancelStackButton selectionToBeCleared={true}/>
                  }}
                />

              </Stack.Group>
              
            </Stack.Group>

          </Stack.Navigator>
        </View>
      {/* </ConnectivityProvider> */}
    </Provider>
  );
}


