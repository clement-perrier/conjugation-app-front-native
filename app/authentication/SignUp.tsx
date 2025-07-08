import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import {  StyleSheet, View, Text } from 'react-native';
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
import EmailInput from '@/components/layout/EmailInput';
import IsAuthenticated from '@/state/slices/isAuthtenticated';
import { Routes } from '@/types/RootStackParamList';
import useDisableBackHandler from '@/hooks/useDisableBackHandler';

export default function SignUp() {

  const navigation = useAppNavigation()
  const dispatch = useAppDispatch();

  // Disable the back button for this screen
  useDisableBackHandler()

  // States
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isSigningUpGuest, setIsSigningUpGuest] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const userIsLoading = useAppSelector(state => state.User.loading)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  // Derived data
  const havePasswordsMinLength = password.length >=6 && passwordConfirmation.length >=6 
  const arePasswordsEqual = password === passwordConfirmation && havePasswordsMinLength
  const isPasswordError = !arePasswordsEqual && havePasswordsMinLength

  // Handlers
  const handleSignup = async () => {
    const emailTrimmed = email.trim()
    setIsSigningUp(true)
    try {
      const registeredUser = await ApiService.AuthSignup({email: emailTrimmed, password})
      setIsSigningUp(false)
      if (registeredUser){
        setIsLogging(true)
        registeredUser && await AuthenticationService.Login(dispatch, emailTrimmed, password, true)
        setIsLogging(false)
      }
    } catch (error) {
      console.error('SignUp.tsx - handleSignup() failed', error)
      setIsSigningUp(false)
      setIsLogging(false)
    }
  }

  const handleGuest = async () => {
    setIsSigningUpGuest(true)
    const registeredUser: User = await ApiService.AuthSignupAsGuest()
    const jwtResponse: JwtResponse = await ApiService.AuthLoginAsGuest(registeredUser.id)
    AuthenticationService.SaveJwtInfoLocally(jwtResponse)
    AuthenticationService.LoadInitialData(dispatch, registeredUser.id)
    setIsSigningUpGuest(false)
  }
  
  if(isSigningUp){
    return <Spinner text={'Signing up'}/>
  }

  if(isSigningUpGuest){
    return <Spinner text={'Creating guest user'}/>
  }

  if(isLogging){
    return <Spinner text={'Logging in'}/>
  }

  if(userIsLoading){
    return <Spinner text={'Loading user'}/>
  }

  return (
      <View style={[globalstyles.flexColumn, globalstyles.container]}>
  
        <Text style={[globalstyles.title, globalstyles.text]}>Sign up</Text>
  
        {/* Email input */}
        <EmailInput 
          value={email}
          handleValue={setEmail}
        />
  
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
            disabled={!email || password.length < 6 || !validateEmail(email) || !arePasswordsEqual}
            />

          {/* Bottom Text */}
          <View style={[globalstyles.flexRow, globalstyles.text, {columnGap: 10}]}>
            <Text>{'Already have an account ?'}</Text>
            <Text 
              style={styles.bottomText}
              onPress={() => navigation.navigate(Routes.Login)}
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
