import { useAppNavigation } from '@/hooks/useAppNavigation';
import { StyleSheet, Text, View } from 'react-native';
import { globalstyles } from '@/utils/GlobalStyle';
import BottomButton from '@/components/buttons/BottomButton';
import { useState } from 'react';
import { validateEmail } from '@/utils/ValidateEmail';
import EmailInput from '@/components/layout/EmailInput';
import { AuthPasswordResetRequest } from '@/services/ApiService';
import Spinner from '@/components/layout/Spinner';
import { consoleError } from '@/utils/Messages';
import { Routes } from '@/types/RootStackParamList';

export default function PasswordResetRequest() {

  const navigation = useAppNavigation()
  //  States
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  // Handlers
  // Function to handle the reset password request
  const handleResetRequest = async () => {
    setIsLoading(true)
    try {
      const resetPasswordResponse = await AuthPasswordResetRequest(email)
      resetPasswordResponse && navigation.navigate(Routes.NewPassword)
    } catch (error) {
      consoleError('PasswordResetRequest.tsx', 'handleResetRequest', error)
    }
    setIsLoading(false)
  };

  if(isLoading){
    return <Spinner text={'Sending'}/>
  }

  return (
    <View style={[globalstyles.flexColumn, globalstyles.container]}>

      <Text style={globalstyles.title}>Reset your password</Text>

      {/* Email input */}
      <EmailInput 
        value={email}
        handleValue={setEmail}
      />
      
      {/* Reset password button */}
      <BottomButton 
        label='Send reset code'
        onPress={handleResetRequest} 
        disabled={!email || !validateEmail(email)}
      />

    </View>
  );
}

const styles = StyleSheet.create({

});
