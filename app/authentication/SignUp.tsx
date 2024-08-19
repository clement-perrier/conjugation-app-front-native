import { useAppNavigation } from '@/hooks/useAppNavigation';
import MainLayout from '@/components/layout/MainLayout';
import { useAppDispatch } from '@/state/hooks';
import { StyleSheet, Text } from 'react-native';

export default function SignUp() {

  const navigation = useAppNavigation()

  const dispatch = useAppDispatch();

  // Selectors

  // States

  // Derived data

  // Functions

  // Handlers

  // Buttons

  return (
    <MainLayout>

        <><Text>Sign up</Text></>

    </MainLayout>
  );
}

const styles = StyleSheet.create({

});
