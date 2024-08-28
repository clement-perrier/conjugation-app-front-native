
import { StyleSheet, TextInput, Text } from 'react-native';
import { globalstyles } from '@/utils/GlobalStyle';
import { useState } from 'react';
import { validateEmail } from '@/utils/ValidateEmail';

interface EmailInputProps {
  value: string,
  handleValue: React.Dispatch<React.SetStateAction<string>>
}

export default function EmailInput({value, handleValue} : EmailInputProps) {

  // States
  const [isEmailValid, setIsEmailValid] = useState(true);

  // Handlers
  const handleBlur = () => {
    setIsEmailValid(validateEmail(value));
  };

  return (
    <>
      <TextInput
        placeholder='Email'
        value={value}
        onChangeText={handleValue}
        onBlur={handleBlur}
        style={globalstyles.input}
      />

      {!isEmailValid && <Text style={globalstyles.invalidEmailText}>Invalid email address</Text>}
    </>
  );
}

const styles = StyleSheet.create({

});
