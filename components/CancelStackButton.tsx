import { NavigationProp, StackActions } from "@react-navigation/native"
import { RootStackParamList } from "@/types/RootStackParamList"
import IconButton from "./IconButton"

export default function CancelStackButton({ navigation } : { navigation: NavigationProp<RootStackParamList> }) {

   return <IconButton icon={'plus'} onPress={() => navigation.dispatch(StackActions.popToTop())}/>

}