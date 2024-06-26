import { createStackNavigator } from "@react-navigation/stack";
import PreSetList from "./new-set-flow/PreSetList";
import TenseSelection from "./new-set-flow/TenseSelection";
import VerbSelection from "./new-set-flow/VerbSelection";
import SetSummary from "./new-set-flow/SetSummary";
import Home from "./Home";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import CancelStackButton from "@/components/CancelStackButton";
import { store } from "@/state/store";
import { Provider } from "react-redux";
import { View } from "react-native";

const Stack = createStackNavigator();

export default function App() {

  const navigation = useAppNavigation();

  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
      <Stack.Navigator>
        <Stack.Screen name="Home"component={Home} options={{ headerShown: false }} />
        <Stack.Screen 
          name="Pre-set list" 
          component={PreSetList}
          options={{ 
            headerRight: () => <CancelStackButton navigation={navigation}/>
          }}
        />
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
          name="Set summary"  
          component={SetSummary}
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


