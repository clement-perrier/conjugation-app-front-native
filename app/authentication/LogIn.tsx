import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { StyleSheet, View, Text } from 'react-native';
import { useState } from 'react';
import { Login } from '@/services/AuthenticationService';
import { globalstyles } from '@/utils/GlobalStyle';
import { validateEmail } from '@/utils/ValidateEmail';
import PasswordInput from '@/components/layout/PasswordInput';
import BottomButton from '@/components/buttons/BottomButton';
import Spinner from '@/components/layout/Spinner';
import Styles from '@/constants/Styles';
import EmailInput from '@/components/layout/EmailInput';
import { handleSuccess } from '@/utils/Messages';
import { Routes } from '@/types/RootStackParamList';
import useDisableBackHandler from '@/hooks/useDisableBackHandler';

export default function LogIn() {

  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  // Disable the back button for this screen
  useDisableBackHandler()

  // States
  const [isLoading, setIsLoading] = useState(false);
  const userIsLoading = useAppSelector(state => state.User.loading)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handlers
  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const token = await Login(dispatch, email.trim() , password, false)
    } catch (error) {
      console.error('Login.tsx - handleLogin() failed: ', error);
    }
    setIsLoading(false)
    // if(!token){
    // }
  };

  if(isLoading){
    return <Spinner text={'Logging in'}/>
  }

  if(userIsLoading){
    return <Spinner text={'Loading user'}/>
  }

  return (
    <View style={[globalstyles.flexColumn, globalstyles.container]}>

      <Text style={[globalstyles.title, globalstyles.text]}>{'Log in'}</Text>

      {/* Email input */}
      <EmailInput 
        value={email}
        handleValue={setEmail}
      />

      {/* Password input */}
      <PasswordInput
        placeholder={'Password'}
        password={password}
        handlePassword={setPassword}
      />

      {/* Forgot password */}
      <View style={styles.forgotPasswordContainer}>
        <Text 
          onPress={() => navigation.navigate(Routes.ResetPasswordRequest)} 
          style={styles.forgotPassword}
        >
          Forgot your password?
        </Text>
      </View>

      {/* Main button */}
      <BottomButton 
        label={'Login'}
        onPress={handleLogin} 
        disabled={!email || password.length < 6 || !validateEmail(email)}
      />

      {/* Bottom Text */}
      <View style={[globalstyles.flexRow, globalstyles.text, {columnGap: 5}]}>
        <Text>{`Don't have an account ?`}</Text>
        <Text 
          style={styles.bottomText}
          onPress={() => navigation.navigate(Routes.Signup)}
        >
          Sign up
        </Text>
      </View>

    </View>
  );
      
}

const styles = StyleSheet.create({
  bottomText: {
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    width: '100%', 
    maxWidth: Styles.maxWidth,
    marginBottom: 10
  },
  forgotPassword: {
    fontWeight: 'bold',
    textAlign: 'right'
  }
})
