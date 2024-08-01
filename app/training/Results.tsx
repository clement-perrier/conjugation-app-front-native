import { useAppNavigation } from '@/hooks/useAppNavigation';
import TableList from '@/components/layout/TableList';
import MainLayout from '@/components/layout/MainLayout';
import { LayoutButton } from '@/types/LayoutButton';
import { useAppDispatch, useAppSelector } from '@/state/hooks';

export default function Results() {

  const navigation = useAppNavigation()
  const dispatch = useAppDispatch()

  // Selectors

  // States

  // Derived data

  // Functions

  // Handlers

  // Buttons
  const buttons: LayoutButton[] = [
    {
      label: 'OK',
      onPress: () => {
        navigation.navigate('Home')
      }
    }
  ]

  return (
    <MainLayout buttons={buttons}>

      <TableList results={true}/>

    </MainLayout>
  );
}
