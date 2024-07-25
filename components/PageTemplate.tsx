import { useAppNavigation } from '@/hooks/useAppNavigation';
import MainLayout from '@/components/layout/MainLayout';
import { useAppDispatch } from '@/state/hooks';
import { StyleSheet } from 'react-native';

export default function PageTemplate() {

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

        <></>

    </MainLayout>
  );
}

const styles = StyleSheet.create({

});
