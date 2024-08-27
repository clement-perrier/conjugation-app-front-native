import { useAppNavigation } from '@/hooks/useAppNavigation';
import MainLayout from '@/components/layout/MainLayout';
import { useAppDispatch } from '@/state/hooks';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { globalstyles } from '@/utils/GlobalStyle';
import BottomButton from '@/components/buttons/BottomButton';
import { SetStateAction, useState } from 'react';
import { validateEmail } from '@/utils/ValidateEmail';
import PasswordInput from '@/components/layout/PasswordInput';
import EmailInput from '@/components/layout/EmailInput';

export default function ResetPassword() {

  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  // Handlers
  
  // Function to handle the reset password request
  const handleResetPassword = async () => {
    
  };

  const handleBlur = () => {
    setIsEmailValid(validateEmail(email));
  };

  return (
    <View style={[globalstyles.flexColumn, globalstyles.container]}>

      <Text style={globalstyles.title}>Reset Password</Text>

      {/* Email input */}
      <EmailInput 
        value={email}
        handleValue={setEmail}
      />

      <PasswordInput 
        placeholder={'New password (minimum 6 characters)'} 
        password={password1} 
        handlePassword={setPassword1}
      />

      <PasswordInput 
        placeholder={'Confirm password'} 
        password={password2} 
        handlePassword={setPassword2}
      />
      
      <BottomButton 
        label='Reset password'
        onPress={handleResetPassword} 
        disabled={password1.length < 6 || password2.length < 6 || !validateEmail(email)}
      />

    </View>
  );
}

const styles = StyleSheet.create({

});
