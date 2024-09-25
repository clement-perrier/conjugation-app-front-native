import { store } from "@/state/store";
import { Provider } from "react-redux";
import { View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import AppNavigator from "./AppNavigator";
import Toast from 'react-native-toast-message';
import { globalstyles } from "@/utils/GlobalStyle";

export default function Index() {
  
  useEffect(() => {

  }, []);   

  return (
    <SafeAreaProvider>
      <Provider store={store}>
          <View style={[{flex: 1, padding: 15}, globalstyles.backgroundColor]}>
            <AppNavigator/>
            <Toast/>
          </View>
      </Provider>
    </SafeAreaProvider>
  );
}


