import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./RootStackParamList";

type SuccessScreenRouteProp = RouteProp<RootStackParamList, 'Success screen'>;

export type SuccessScreenProps = {
  route: SuccessScreenRouteProp;
};

// interface SuccessScreenProps {
//   isLogin?: boolean,  
//   time?: number,
//   successfulText?: string
//   }