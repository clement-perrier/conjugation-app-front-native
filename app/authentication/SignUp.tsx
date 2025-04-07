import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch } from '@/state/hooks';
import {  StyleSheet, View, Text, TextInput } from 'react-native';
import {  useState } from 'react';
import * as AuthenticationService from '@/services/AuthenticationService';
import * as ApiService from '@/services/ApiService';
import { globalstyles } from '@/utils/GlobalStyle';
import { validateEmail } from '@/utils/ValidateEmail';
import PasswordInput from '@/components/layout/PasswordInput';
import BottomButton from '@/components/buttons/BottomButton';
import Spinner from '@/components/layout/Spinner';
import { JwtResponse } from '@/types/JwtResponse';
import { User } from '@/types/User';

export default function SignUp() {

  const navigation = useAppNavigation()
  const dispatch = useAppDispatch();

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  // Derived data
  const havePasswordsMinLength = password.length >=6 && passwordConfirmation.length >=6 
  const arePasswordsEqual = password === passwordConfirmation && havePasswordsMinLength
  const isPasswordError = !arePasswordsEqual && havePasswordsMinLength

  // Handlers
  const handleSignup = async () => {
    setIsLoading(true)
    const emailTrimmed = email.trim()
    const registeredUser = await ApiService.AuthSignup({email: emailTrimmed, password})
    if(registeredUser){
      AuthenticationService.Login(dispatch, emailTrimmed, password, true)
    }
    setIsLoading(false)
  }

  const handleGuest = async () => {
    setIsLoading(true)
    const registeredUser: User = await ApiService.AuthSignupAsGuest()
    const jwtResponse: JwtResponse = await ApiService.AuthLoginAsGuest(registeredUser.id)
    AuthenticationService.SaveJwtInfoLocally(jwtResponse)
    AuthenticationService.LoadInitialData(dispatch, registeredUser.id)
    setIsLoading(false)
  }

  const handleBlurEmail = () => {
    setIsEmailValid(validateEmail(email));
  };

  if(isLoading){
    return <Spinner text={'Signing up'}/>
  }

  return (
      <View style={[globalstyles.flexColumn, globalstyles.container, globalstyles.flexCenter]}>
  
        <Text style={[globalstyles.title, globalstyles.text]}>Sign up</Text>
  
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
          placeholder={'Password (minimum 6 characters)'}
          password={password}
          handlePassword={setPassword}
          isError={isPasswordError}
        />

        <PasswordInput
            placeholder={'Confirm password'}
            password={passwordConfirmation}
            handlePassword={setPasswordConfirmation}
            isError={isPasswordError}
        />

        {/* Display password mismatch message */}
        {isPasswordError && (
          <Text style={globalstyles.invalidEmailText}>Passwords are different</Text>
        )}
  
        {/* Buttons */}
        <View style={[globalstyles.flexColumn, globalstyles.flexCenter, {width: '100%'}]}>

          {/* Sign Up Button */}
          <BottomButton 
            label={'Signup'}
            onPress={handleSignup} 
            disabled={password.length < 6 || !validateEmail(email) || !arePasswordsEqual}
            />

          {/* Bottom Text */}
          <View style={[globalstyles.flexRow, globalstyles.text, {columnGap: 10}]}>
            <Text>{'Already have an account ?'}</Text>
            <Text 
              style={styles.bottomText}
              onPress={() => navigation.navigate('Log in')}
            >
              {'Log in'}
            </Text>
          </View>

          <Text style={globalstyles.text}>OR</Text>

          {/* Continue As Guest Button */}
          <BottomButton 
            label={'CONTINUE AS GUEST'}
            onPress={handleGuest} 
          />

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
