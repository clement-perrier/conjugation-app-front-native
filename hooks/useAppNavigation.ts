import { RootStackParamList } from "@/types/RootStackParamList";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export function useAppNavigation() {
    return useNavigation<StackNavigationProp<RootStackParamList>>();
} 