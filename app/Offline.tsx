import { useAppNavigation } from '@/hooks/useAppNavigation';
import MainLayout from '@/components/layout/MainLayout';
import { useAppDispatch } from '@/state/hooks';
import { StyleSheet, Text } from 'react-native';
import { LayoutButton } from '@/types/LayoutButton';
import { globalstyles } from '@/utils/GlobalStyle';
import { checkAuth } from '@/services/AuthenticationService';

export default function Offline() {

  const navigation = useAppNavigation()

  const dispatch = useAppDispatch();

  // Selectors

  // States

  // Derived data

  // Functions

  // Handlers

  // Buttons
  const buttons: LayoutButton[] = [
    {
      onPress: () => checkAuth(dispatch),
      label: 'RETRY'
    }
  ]
  return (
    <MainLayout buttons={buttons}>
        <Text style={globalstyles.text}>You're offline. Please connect to the internet to continue using the app, then tap the button below.</Text>
    </MainLayout>
  );
}

const styles = StyleSheet.create({

});
