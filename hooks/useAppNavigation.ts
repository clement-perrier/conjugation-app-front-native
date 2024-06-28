import { RootStackParamList } from "@/types/RootStackParamList";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export function useAppNavigation() {
    return useNavigation<NavigationProp<RootStackParamList>>();
} 