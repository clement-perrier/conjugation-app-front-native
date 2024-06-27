import { RootStackParamList } from "@/types/RootStackParamList";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export function useNavigationCustom() {
    return useNavigation<NavigationProp<RootStackParamList>>();
} 