import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch } from '@/state/hooks';
import {  StyleSheet, View, Text, TextInput } from 'react-native';
import { AuthSignup } from '@/services/ApiService';
import { useEffect, useState } from 'react';
import { Login } from '@/services/AuthenticationService';
import { globalstyles } from '@/utils/GlobalStyle';
import { validateEmail } from '@/utils/ValidateEmail';
import PasswordInput from '@/components/layout/PasswordInput';
import BottomButton from '@/components/buttons/BottomButton';

export default function SignUp() {

  const navigation = useAppNavigation()
  const dispatch = useAppDispatch();

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [passwordsEqual, setPasswordsEqual] = useState(true);

  // Derived data

  // Functions
  const arePasswordsEqual = () => {
    return password === passwordConfirmation
  }

  // Handlers
  const handleSignup = async () => {
    setIsLoading(true)
    const emailTrimmed = email.trim()
    const registeredUser = await AuthSignup({email: emailTrimmed, password})
    if(registeredUser){
      Login(dispatch, emailTrimmed, password, true)
    } else {
      setIsLoading(false)
      // handleFail('Sign up failed', 'Something went wrong') 
    }
  }

  const handleBlurEmail = () => {
    setIsEmailValid(validateEmail(email));
  };

  // Effects
  useEffect(() => {
    // useEffect to validate passwords whenever they change
    setPasswordsEqual(arePasswordsEqual());
  }, [password, passwordConfirmation]); // Depend on both password states

  // return (      
  //   <AuthenticationLayout 
  //     isLogin={false} 
  //     onPrimaryPress={handleSignup}
  //     isLoading={isLoading}
  //   />
  // );

  return (
      <View style={[globalstyles.flexColumn, globalstyles.container]}>
  
        <Text style={[globalstyles.title, globalstyles.text]}>Sign up</Text>
  
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
          placeholder={'Password (minimum 6 characters)'}
          password={password}
          handlePassword={setPassword}
        />

        <PasswordInput
            placeholder={'Confirm password'}
            password={passwordConfirmation}
            handlePassword={setPasswordConfirmation}
        />

        {/* Display password mismatch message */}
        {!passwordsEqual && password && passwordConfirmation && (
          <Text style={globalstyles.invalidEmailText}>Passwords are different</Text>
        )}
  
        {/* Main button */}
        <BottomButton 
          label={'Signup'}
          onPress={handleSignup} 
          disabled={password.length < 6 || !validateEmail(email) || !arePasswordsEqual()}
        />
  
        {/* Bottom Text */}
        <View style={[globalstyles.flexRow, globalstyles.text]}>
          <Text>{'Already have an account?'}</Text>
          <Text 
            style={styles.bottomText}
            onPress={() => navigation.navigate('Log in')}
          >
            {'Log in'}
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
  }
});
