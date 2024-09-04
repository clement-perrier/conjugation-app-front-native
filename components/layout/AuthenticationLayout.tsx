import { useAppNavigation } from '@/hooks/useAppNavigation';
import MainLayout from '@/components/layout/MainLayout';
import { useAppDispatch } from '@/state/hooks';
import { StyleSheet, TextInput, View, Text, ActivityIndicator } from 'react-native';
import { globalstyles } from '@/utils/GlobalStyle';
import { useState } from 'react';
import BottomButton from '../buttons/BottomButton';
import IconButton from '../buttons/IconButton';
import { MaterialIcons } from '@expo/vector-icons';
import Spinner from './Spinner';
import { validateEmail } from '@/utils/ValidateEmail';
import PasswordInput from './PasswordInput';

interface AuthenticationLayoutProps {
  isLogin: boolean,
  onPrimaryPress: (email: string, password: string) => void,
  isLoading: boolean
}
export default function AuthenticationLayout({isLogin, onPrimaryPress, isLoading} : AuthenticationLayoutProps) {

  const navigation = useAppNavigation()

  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  // Handlers
  const handleBlur = () => {
    setIsEmailValid(validateEmail(email));
  };

  if(isLoading){
    return <Spinner text={isLogin ? 'Logging in' : 'Signing up'}/>
  }

  return (
    <View style={[globalstyles.flexColumn, globalstyles.container]}>

      <Text style={[globalstyles.title, globalstyles.text]}>{isLogin ? 'Log in' : 'Sign up'}</Text>

      {/* Email input */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        onBlur={handleBlur}
        style={globalstyles.input}
      />

      {!isEmailValid && <Text style={globalstyles.invalidEmailText}>Invalid email address</Text>}

      {/* Password input */}
      <PasswordInput
        placeholder={isLogin ? 'Password' : 'Password (minimum 6 characters)'}
        password={password}
        handlePassword={setPassword}
      />

      {/* Forgot password */}
      {
        isLogin && 
          <Text 
            onPress={() => navigation.navigate('Reset password request')} 
            style={[styles.forgotPassword]}
          >
            Forgot your password?
          </Text>
      }

      {/* Main button */}
      <BottomButton 
        label={isLogin ? 'Login' : 'Signup'}
        onPress={() => onPrimaryPress(email, password)} 
        disabled={password.length < 6 || !validateEmail(email)}
      />

      {/* Bottom Text */}
      <View style={[globalstyles.flexRow, globalstyles.text]}>
        <Text>{isLogin ? `Don't have an account?` : 'Already have an account?'}</Text>
        <Text 
          style={styles.bottomText}
          onPress={() => navigation.navigate(isLogin ? 'Sign up' : 'Log in')}
        >
          {isLogin ? 'Sign up' : 'Log in'}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  bottomText: {
    fontWeight: 'bold',
    // marginLeft: 1
  },
  forgotPassword: {
    marginBottom: 10,
    marginTop: -10,
    textAlign: 'right',
    fontWeight: 'bold'
  }
});
