import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import PreSetList from "./new-set-flow/preSetList";
import TenseSelection from "./new-set-flow/custom-set/TenseSelection";
import VerbSelection from "./new-set-flow/custom-set/VerbSelection";
import SetSummary from "./new-set-flow/custom-set/SetSummary";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Pre-set list" component={PreSetList} options={{presentation: 'modal'}} />
      <Stack.Screen name="Tense(s) selection" component={TenseSelection} options={{presentation: 'modal'}}/>
      <Stack.Screen name="Verb(s) selection" component={VerbSelection}/>
      <Stack.Screen name="Set summary" component={SetSummary}/>
  </Stack.Navigator>
  );
}


