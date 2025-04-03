import { StyleSheet, TextInput, View } from 'react-native';
import IconButton from '../buttons/IconButton';
import { globalstyles } from '@/utils/GlobalStyle';
import { useState } from 'react';
import Styles from '@/constants/Styles';

interface PasswordInputProps {
  placeholder: string,
  password: string,
  handlePassword: (React.Dispatch<React.SetStateAction<string>>),
  disable?: boolean,
  onBlur?: () => void
  isError?: boolean
}

export default function PasswordInput({placeholder, password, handlePassword, disable, onBlur, isError} : PasswordInputProps) {

  // States
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[{position: 'relative', width: '100%', maxWidth: Styles.maxWidth}, disable && styles.disable]}>
      <TextInput
        placeholder={placeholder}
        value={password}
        onChangeText={handlePassword}
        secureTextEntry={!isPasswordVisible}
        style={[globalstyles.input, isError && globalstyles.invalidInput]}
        editable={!disable}
        onBlur={onBlur}
      />
      <IconButton 
        onPress={() => setIsPasswordVisible(!isPasswordVisible)} 
        icon={isPasswordVisible ? 'visibility-off' : 'visibility'} 
        size={18} 
        color="black"
        style={styles.icon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  disable: {
    opacity: 0.3
  },
  icon: {
    position: 'absolute',
    right: 5,
    padding: 10,
    top: '50%', 
    transform: [{ translateY: -19 }]
  }
});