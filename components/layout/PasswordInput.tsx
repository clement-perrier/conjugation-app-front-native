import { useAppNavigation } from '@/hooks/useAppNavigation';
import MainLayout from '@/components/layout/MainLayout';
import { useAppDispatch } from '@/state/hooks';
import { StyleSheet, TextInput, View } from 'react-native';
import IconButton from '../buttons/IconButton';
import { globalstyles } from '@/utils/GlobalStyle';
import { useState } from 'react';

interface PasswordInputProps {
  placeholder: string,
  password: string,
  handlePassword: React.Dispatch<React.SetStateAction<string>>
}

export default function PasswordInput({placeholder, password, handlePassword} : PasswordInputProps) {

  // States
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={{position: 'relative'}}>
      <TextInput
        placeholder={placeholder}
        value={password}
        onChangeText={handlePassword}
        secureTextEntry={!isPasswordVisible}
        style={globalstyles.input}
      />
      <IconButton 
        onPress={() => setIsPasswordVisible(!isPasswordVisible)} 
        icon={isPasswordVisible ? 'visibility-off' : 'visibility'} 
        size={18} 
        color="black"
        style={{position: 'absolute', right: 10, top: '50%', transform: [{ translateY: -9 }],}}
      />
    </View>
  );
}

const styles = StyleSheet.create({

});
