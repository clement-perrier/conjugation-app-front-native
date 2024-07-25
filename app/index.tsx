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

const Stack = createStackNavigator();

export default function App() {

  const navigation = useAppNavigation();

  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen  name="Home"component={Home} options={{ headerShown: false }} />
        <Stack.Screen 
          name="Tense(s) selection"
          component={TenseSelection}
          options={{ 
            headerRight: () => <CancelStackButton navigation={navigation}/>
          }}
        />
        <Stack.Screen 
          name="Verb(s) selection" 
          component={VerbSelection}
          options={{ 
            headerRight: () => <CancelStackButton navigation={navigation}/>
          }}
        />
        <Stack.Screen 
          name="Batch progress"  
          component={BatchProgress}
          options={{ 
            headerLeft: () => null,
            headerRight: () => <CancelStackButton navigation={navigation}/>
          }}
        />
        <Stack.Screen 
          name="Batch created"
          component={BatchCreated} 
          options={{   
            headerLeft: () => null,
            headerRight: () => <CancelStackButton navigation={navigation}/>
          }}
        />
        <Stack.Screen 
          name="Start"
          component={Start} 
          options={{   
            headerLeft: () => null,
            headerRight: () => <CancelStackButton navigation={navigation}/>
          }}
        />
        <Stack.Screen 
          name="Question" 
          component={Question}
          options={{ 
            headerLeft: () => null,
            headerRight: () => <CancelStackButton navigation={navigation}/>
          }}
        />
        <Stack.Screen 
          name="Results" 
          component={Results}
          options={{ 
            headerLeft: () => null,
            headerRight: () => <CancelStackButton navigation={navigation}/>
          }}
        />
    </Stack.Navigator>
    </View>
  </Provider>
  );
}


