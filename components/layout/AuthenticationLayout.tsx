import { useAppNavigation } from '@/hooks/useAppNavigation';
import MainLayout from '@/components/layout/MainLayout';
import { useAppDispatch } from '@/state/hooks';
import { StyleSheet, TextInput, View, Text, ActivityIndicator } from 'react-native';
import { globalstyles } from '@/utils/GlobalStyle';
import { useState } from 'react';
import BottomButton from '../buttons/BottomButton';
import IconButton from '../buttons/IconButton';
import { MaterialIcons } from '@expo/vector-icons';
import Spinner from './Spinner';

interface AuthenticationLayoutProps {
  isLogin: boolean,
  onPrimaryPress: (email: string, password: string) => void,
  isLoading: boolean
}
export default function AuthenticationLayout({isLogin, onPrimaryPress, isLoading} : AuthenticationLayoutProps) {

  const navigation = useAppNavigation()
  const dispatch = useAppDispatch()

  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  if(isLoading){
    return <Spinner text={isLogin ? 'Logging in' : 'Signing up'}/>
  }

  return (
    <View style={[globalstyles.flexColumn, globalstyles.container]}>

      <Text style={[styles.title, globalstyles.text]}>{isLogin ? 'Log in' : 'Sign up'}</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        />
      <View style={{position: 'relative'}}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          style={[styles.input]}
        />
        <IconButton 
          onPress={() => setIsPasswordVisible(!isPasswordVisible)} 
          icon={isPasswordVisible ? 'visibility-off' : 'visibility'} 
          size={18} 
          color="black"
          style={{position: 'absolute', right: 10, top: '50%', transform: [{ translateY: -9 }],}}
        />
      </View>

      <BottomButton 
        label={isLogin ? 'Login' : 'Signup'}
        onPress={() => onPrimaryPress(email, password)} 
        // disabled={email.length == 0 || password.length == 0 || !email.includes('@') || !email.includes('.')}
      />

      <View style={[globalstyles.flexRow, globalstyles.text]}>
        <Text>{isLogin ? `Don't have an account?` : 'Already have an account?'}</Text>
        <Text 
          style={styles.bottomText}
          onPress={() => navigation.navigate(isLogin ? 'Sign up' : 'Log in')}
        >
          {isLogin ? 'Sign up' : 'Log in'}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black'
  },
  bottomText: {
    fontWeight: 'bold',
    marginLeft: 4
  }
});
