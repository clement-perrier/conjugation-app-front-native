import { store } from "@/state/store";
import { Provider } from "react-redux";
import { View } from "react-native";
import AppContent from "./AppContent";


export default function Index() {

  return (
    <Provider store={store}>
      {/* <ConnectivityProvider> */}
        <View style={{flex: 1}}>
          <AppContent />
        </View>
      {/* </ConnectivityProvider> */}
    </Provider>
  );
}


