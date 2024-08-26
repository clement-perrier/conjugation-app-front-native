import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch } from '@/state/hooks';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import AuthenticationLayout from '@/components/layout/AuthenticationLayout';
import { Login } from '@/services/AuthenticationService';

export default function LogIn() {

  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  // States
  const [isLoading, setIsLoading] = useState(false);

  // Handlers
  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true)
    const token = Login(dispatch, email , password, false)
    if(!token){
      setIsLoading(false)
    }
  };

  return (
  
    <AuthenticationLayout 
      isLogin={true} 
      onPrimaryPress={handleLogin} 
      isLoading={isLoading}
    />
      
  );
}

const styles = StyleSheet.create({
  
});
