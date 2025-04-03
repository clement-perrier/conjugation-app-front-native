import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch } from '@/state/hooks';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import AuthenticationLayout from '@/components/layout/AuthenticationLayout';
import { Login } from '@/services/AuthenticationService';
import { globalstyles } from '@/utils/GlobalStyle';
import { validateEmail } from '@/utils/ValidateEmail';
import PasswordInput from '@/components/layout/PasswordInput';
import BottomButton from '@/components/buttons/BottomButton';
import Spinner from '@/components/layout/Spinner';
import Styles from '@/constants/Styles';

export default function LogIn() {

  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  // Handlers
  const handleLogin = async () => {
    setIsLoading(true)
    const token = await Login(dispatch, email.trim() , password, false)
    if(!token){
      setIsLoading(false)
    }
  };

  const handleBlurEmail = () => {
    setIsEmailValid(validateEmail(email));
  };

  if(isLoading){
    return <Spinner text={'Logging in'}/>
  }

  return (
    <View style={[globalstyles.flexColumn, globalstyles.container, globalstyles.flexCenter]}>

      <Text style={[globalstyles.title, globalstyles.text]}>{'Log in'}</Text>

      {/* Email input */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        onBlur={handleBlurEmail}
        style={[globalstyles.input, !isEmailValid && globalstyles.invalidInput]}
      />

      {!isEmailValid && <Text style={globalstyles.invalidEmailText}>Invalid email address</Text>}

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
        disabled={password.length < 6 || !validateEmail(email)}
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
