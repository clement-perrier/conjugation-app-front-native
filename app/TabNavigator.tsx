import Home from "./tabs/Home";
import Settings from "./tabs/Settings";
import NewSet from "./tabs/NewSet";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="New Set" component={NewSet}/>
        <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}


