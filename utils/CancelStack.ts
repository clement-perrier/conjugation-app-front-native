import { RootStackParamList } from "@/types/RootStackParamList";
import { NavigationProp } from "@react-navigation/native";

export function CancelStack(navigation: NavigationProp<RootStackParamList>) {

    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    })
    
}