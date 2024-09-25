/* 
import { ActivityIndicator, StatusBar } from "react-native";
import AppNavigator from "./AppNavigator";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useEffect, useState } from "react";
import { FetchLearningLanguageList, FetchUser } from "@/services/ApiService";
import { globalstyles } from "@/utils/GlobalStyle";
import { updateIsOnBoarding } from "@/state/slices/isOnBoardingSlice";


export default function AppContent() {

  const dispatch = useAppDispatch();

  // Selectors
  const user = useAppSelector(state => state.User.value);

  // Derived data

  // States
  const [initialRouteName, setInitialRouteName] = useState<string | null>(null);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
      // dispatch(FetchUser())
      // dispatch(FetchLearningLanguageList())
      // StatusBar.currentHeight = 0
  }, []);

  useEffect(() => {
 
      if (user) {
        setInitialRouteName(user.defaultLearningLanguage ? 'Home' : 'Add learning language');

        user.defaultLearningLanguage 
          ? setInitialRouteName('Home')
          : ( 
            dispatch(updateIsOnBoarding(true)),
            setInitialRouteName('Add learning language')
          ) 

        setIsDataReady(true);
        console.log(user)
      }

  }, [user]);

  if (!isDataReady) {
    return <ActivityIndicator style={[globalstyles.text, globalstyles.flatListContent]} size="large" color="#0000ff" />;
  }

  return (
    initialRouteName && <AppNavigator/>
  );
}


 */