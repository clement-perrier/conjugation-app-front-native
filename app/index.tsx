import { store } from "@/state/store";
import { Provider } from "react-redux";
import { SafeAreaView, StatusBar, View } from "react-native";
import AppContent from "./AppContent";
import { useEffect } from "react";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {

  const insets = useSafeAreaInsets();

  useEffect(() => {

  }, []);   

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        {/* <ConnectivityProvider> */}
          <View style={{flex: 1, padding: 15}}>
            <AppContent/>
          </View>
        {/* </ConnectivityProvider> */}
      </Provider>
    </SafeAreaProvider>
  );
}


