import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch } from '@/state/hooks';
import { ImageBackground, StyleSheet, View, Text, Image, Pressable } from 'react-native';
import AuthenticationLayout from '@/components/layout/AuthenticationLayout';
import { AuthSignup } from '@/services/ApiService';
import { useState } from 'react';
import { handleFail } from '@/utils/Messages';
import { Login } from '@/services/AuthenticationService';
import { MaterialIcons } from '@expo/vector-icons';
import Flag from '@/components/Flag';

export default function SignUp() {

  const navigation = useAppNavigation()
  const dispatch = useAppDispatch();

  // Selectors

  // States
  const [isLoading, setIsLoading] = useState(false);

  // Derived data

  // Functions

  // Handlers
  const handleSignup = async (email: string, password: string) => {
    setIsLoading(true)
    const registeredUser = await AuthSignup({email, password})
    if(registeredUser){
      Login(dispatch, email, password, true)
    } else {
      setIsLoading(false)
      // handleFail('Sign up failed', 'Something went wrong') 
    }
  }

  return (      
    <AuthenticationLayout 
      isLogin={false} 
      onPrimaryPress={handleSignup}
      isLoading={isLoading}
    />
  );
}

const styles = StyleSheet.create({

});
