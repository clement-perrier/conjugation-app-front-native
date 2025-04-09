
import { StyleSheet, TextInput, Text } from 'react-native';
import { globalstyles } from '@/utils/GlobalStyle';
import { useState } from 'react';
import { validateEmail } from '@/utils/ValidateEmail';
import React from 'react';
import Colors from '@/constants/Colors';

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
        placeholderTextColor={Colors.textPrimary}
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
