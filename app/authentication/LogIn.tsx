import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch } from '@/state/hooks';
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

export default function LogIn() {

  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  // States
  const [isLoading, setIsLoading] = useState(false);
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
    // if(!token){
      setIsLoading(false)
    // }
  };

  if(isLoading){
    return <Spinner text={'Logging in'}/>
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
          onPress={() => navigation.navigate('Reset password request')} 
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
          onPress={() => navigation.navigate('Sign up')}
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
