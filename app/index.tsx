import { store } from "@/state/store";
import { Provider } from "react-redux";
import React from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from "./AppNavigator";
import Toast from 'react-native-toast-message';
import { globalstyles } from "@/utils/GlobalStyle";
import Styles from "@/constants/Styles";
import { View } from "react-native";

export default function Index() {

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <View style={[{flex: 1, padding: Styles.mainPadding}, globalstyles.backgroundColor]}>
          {/* <StatusBar barStyle="dark-content" translucent backgroundColor={'white'} /> */}
          <AppNavigator/>
          <Toast/>
        </View>
      </Provider>
    </SafeAreaProvider>
  );
  
}


