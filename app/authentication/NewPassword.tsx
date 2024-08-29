import { useAppNavigation } from '@/hooks/useAppNavigation';
import { StyleSheet, Text, View } from 'react-native';
import { globalstyles } from '@/utils/GlobalStyle';
import BottomButton from '@/components/buttons/BottomButton';
import { useState } from 'react';
import PasswordInput from '@/components/layout/PasswordInput';
import { AuthChangePassword } from '@/services/ApiService';
import { TextInput } from 'react-native';
import Spinner from '@/components/layout/Spinner';
import OtpTextInput from 'react-native-text-input-otp'

export default function NewPassword() {

  const navigation = useAppNavigation()
  //  States
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  // Derived data
  const codeFilled = code.length === 4

  // Handlers
  // Function to handle the reset password request
  const handleResetPassword = async () => {
    setIsLoading(true)
    const response = await AuthChangePassword({code, newPassword: password})
    if(response){
      navigation.navigate('Log in')
    } else {
      setIsLoading(false)
    }
  };

  if(isLoading){
    return <Spinner text={'Sending'}/>
  }

  return (
    <View style={[globalstyles.flexColumn, globalstyles.container]}>

      <Text style={globalstyles.title}>Reset Password</Text>

      {/* Code input */}
      <OtpTextInput 
        otp={ code }
        setOtp={ setCode }
        digits={4}
        style={{ borderRadius: 3, height: 45 }}
        fontStyle={{ fontSize: 20, fontWeight: 'bold' }}
        focusedStyle={{ borderColor: '#000'}} 
      />

      {/* Password input */}
      <PasswordInput 
        placeholder={'New password (minimum 6 characters)'} 
        password={password} 
        handlePassword={setPassword}
        disable={!codeFilled}
      />

      {/* Confirm password input */}
      <PasswordInput 
        placeholder={'Confirm password'} 
        password={passwordConfirmation} 
        handlePassword={setPasswordConfirmation}
        disable={!codeFilled}
      />

      {/* Reset password button */}
      <BottomButton 
        label='Reset password'
        onPress={handleResetPassword} 
        disabled={password.length < 6 || passwordConfirmation.length < 6 || password !== passwordConfirmation || !codeFilled}
      />

    </View>
  );
}

const styles = StyleSheet.create({

});