import { useAppNavigation } from '@/hooks/useAppNavigation';
import MainLayout from '@/components/layout/MainLayout';
import { useAppDispatch } from '@/state/hooks';
import { StyleSheet, Text, View } from 'react-native';
import { LayoutButton } from '@/types/LayoutButton';
import { globalstyles } from '@/utils/GlobalStyle';
import { checkAuth } from '@/services/AuthenticationService';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '@/constants/Colors';

export default function Offline() {

  const navigation = useAppNavigation()

  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <MaterialIcons name="wifi-off" size={100} color={Colors.secondary} style={styles.icon} />
      <Text style={[globalstyles.text, styles.message]}>
        You’re offline. Please reconnect to the internet to continue using the app.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  icon: {
    marginBottom: 20,
  },
  message: {
    textAlign: "center",
    fontSize: 18,
    color: Colors.textPrimary,
  },
});
