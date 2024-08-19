import { useAppNavigation } from '@/hooks/useAppNavigation';
import MainLayout from '@/components/layout/MainLayout';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { StyleSheet, Text, TextInput } from 'react-native';
import { LayoutButton } from '@/types/LayoutButton';
import { updateIsAuthenticated } from '@/state/slices/isAuthtenticated';
import AppSecureStore from '@/state/SecureStore';
import { useEffect } from 'react';
import IsOnBoardingSlice from '@/state/slices/isOnBoardingSlice';

export default function LogIn() {

  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.IsAuthenticated.value);
  const isOnBoarding = useAppSelector(state => state.IsOnBoarding.value);

  // Handlers
  const handleLogin = async () => {
    await AppSecureStore.SaveItemAsync('access_token', '1111');
    dispatch(updateIsAuthenticated(true));
    // navigation.navigate('Home');
  };

  useEffect(() => {
    if (isAuthenticated) {
      if(isOnBoarding) {
        navigation.navigate('Add learning language');
      } else {
        navigation.navigate('Home');
      }
      
    }
  }, [isAuthenticated]);

  // Buttons
  const buttons: LayoutButton[] = [
    {
      onPress: handleLogin,
      label: 'Log in'
    }
  ]

  return (
    <MainLayout buttons={buttons}>
      <>
        <TextInput
          placeholder="Username"
          // value={username}
          // onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          // value={password}
          // onChangeText={setPassword}
          secureTextEntry
        />
      </>
    </MainLayout>
  );
}

const styles = StyleSheet.create({

});
