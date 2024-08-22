import { useAppNavigation } from '@/hooks/useAppNavigation';
import MainLayout from '@/components/layout/MainLayout';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { StyleSheet, Text, TextInput } from 'react-native';
import { LayoutButton } from '@/types/LayoutButton';
import { updateIsAuthenticated } from '@/state/slices/isAuthtenticated';
import AppSecureStore from '@/state/SecureStore';
import { useEffect, useState } from 'react';
import IsOnBoardingSlice from '@/state/slices/isOnBoardingSlice';
import { Login, LoginUser } from '@/services/ApiService';

export default function LogIn() {

  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  //  Selectors
  const isAuthenticated = useAppSelector(state => state.IsAuthenticated.value);
  const isOnBoarding = useAppSelector(state => state.IsOnBoarding.value);

  // States
  const [email, setEmail] = useState('john.doe@user.com');
  const [password, setPassword] = useState('qwerty');

  // Handlers
  const handleLogin = async () => {

    const loginUser: LoginUser = {
      email,
      password
    }

    try {
      
      const jwtResponse = await Login(loginUser)
      await AppSecureStore.SaveItemAsync('access_token', jwtResponse.accessToken);
      await AppSecureStore.SaveItemAsync('refresh_token', jwtResponse.refreshToken);
      await AppSecureStore.SaveItemAsync('refresh_token_expiry_date', jwtResponse.refreshTokenExpiryDate);
      dispatch(updateIsAuthenticated(true));

    } catch (error: any) {

      // Handle errors that occur during the API call
      console.error('Login failed:', error.response?.data || error.message);
      // You might throw the error again or handle it in another way
      throw new Error(error.response?.data?.message || 'Login failed, please try again.');

    }

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
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
      </>
    </MainLayout>
  );
}

const styles = StyleSheet.create({

});
