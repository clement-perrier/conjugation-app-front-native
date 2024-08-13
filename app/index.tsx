import { store } from "@/state/store";
import { Provider } from "react-redux";
import { StatusBar, View } from "react-native";
import AppContent from "./AppContent";


export default function Index() {

  return (
    <Provider store={store}>
      {/* <ConnectivityProvider> */}
        <StatusBar backgroundColor={'white'}></StatusBar>
        <View style={{flex: 1}}>
          <AppContent />
        </View>
      {/* </ConnectivityProvider> */}
    </Provider>
  );
}


