import { useAppNavigation } from '@/hooks/useAppNavigation';
import MainLayout from '@/components/layout/MainLayout';
import { useAppDispatch } from '@/state/hooks';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { globalstyles } from '@/utils/GlobalStyle';
import Colors from '@/constants/Colors';

export default function Spinner({text}: {text: string}) {

  // Selectors

  // States

  // Derived data

  // Functions

  // Handlers

  // Buttons

  return (
    <View style={[globalstyles.container, {alignItems: 'center'}]}>
        <Text style={[globalstyles.text, {marginBottom: 5}]}>{text}</Text>
        <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}