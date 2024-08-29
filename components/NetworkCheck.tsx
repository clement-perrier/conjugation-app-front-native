import { globalstyles } from "@/utils/GlobalStyle";
import { View, Text } from "react-native";

export function NetworkCheck ({ status, type } : {status: boolean|null, type: string|null}) {

    return (
        <View style={globalstyles.container}>
            <Text style={globalstyles.text}>
                Connection Status : {status ? "Connected": "Disconnected"}
            </Text>
            <Text style={globalstyles.text}>Connection Type : {type}</Text>
        </View>
    );

  };