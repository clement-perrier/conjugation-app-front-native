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

export default function LogIn() {

  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [passwordsEqual, setPasswordsEqual] = useState(true);

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

  // Functions
  const arePasswordsEqual = () => {
    return password === passwordConfirmation
  }

  // useEffect to validate passwords whenever they change
  useEffect(() => {
    setPasswordsEqual(arePasswordsEqual());
  }, [password, passwordConfirmation]); // Depend on both password states

  // return (
  
    // <AuthenticationLayout 
    //   isLogin={true} 
    //   onPrimaryPress={handleLogin} 
    //   isLoading={isLoading}
    // />
  // )

    return (
      <View style={[globalstyles.flexColumn, globalstyles.container]}>
  
        <Text style={[globalstyles.title, globalstyles.text]}>{'Log in'}</Text>
  
        {/* Email input */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          onBlur={handleBlurEmail}
          style={globalstyles.input}
        />
  
        {!isEmailValid && <Text style={globalstyles.invalidEmailText}>Invalid email address</Text>}
  
        {/* Password input */}
        <PasswordInput
          placeholder={'Password'}
          password={password}
          handlePassword={setPassword}
        />

        {/* Display password mismatch message */}
        {!passwordsEqual && password && passwordConfirmation && (
          <Text style={globalstyles.invalidEmailText}>Passwords are different</Text>
        )}
  
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
        <View style={[globalstyles.flexRow, globalstyles.text]}>
          <Text>{`Don't have an account?`}</Text>
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
    marginLeft: -4
    // marginLeft: 1
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: -20,
    marginRight: -10
  },
  forgotPassword: {
    fontWeight: 'bold',
    padding: 10
  }
})
