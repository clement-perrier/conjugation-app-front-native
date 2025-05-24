import { useAppNavigation } from '@/hooks/useAppNavigation';
import MainLayout from '@/components/layout/MainLayout';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { Linking, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import BottomButton from '@/components/buttons/BottomButton';
import Colors from '@/constants/Colors';
import { globalstyles } from '@/utils/GlobalStyle';
import { CustomAlert } from '@/utils/CustomAlert';
import Spinner from '@/components/layout/Spinner';
import AppSecureStore from '@/state/SecureStore';
import { updateIsAuthenticated } from '@/state/slices/isAuthtenticated';
import * as ApiService from '@/services/ApiService';
import { consoleError, handleSuccess } from '@/utils/Messages';
import ListButton from '@/components/buttons/ListButton';
import { LayoutButton } from '@/types/LayoutButton';
import CustomFlatList from '@/components/layout/CustomFlatList';

export default function Settings() {

  const navigation = useAppNavigation()

  const dispatch = useAppDispatch();

  // Selectors
  const user = useAppSelector(state => state.User.value)

  // States
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [isDeletingUser, setIsDeletingUser] = useState(false)

  // Handles
  const handleLogout = async () => {
    return new Promise<void>((resolve) => {
      CustomAlert(
        'Confirm logout',
        'Are you sure you want to logout ?',
        async () => {
          setIsLoggingOut(true);
          try {
            const refreshToken = await AppSecureStore.GetItemAsync('refresh_token');
  
            if (refreshToken) {
              await ApiService.DeleteRefreshToken(refreshToken); // 100% awaited now
            }
  
            await AppSecureStore.SaveItemAsync('access_token', '');
            await AppSecureStore.SaveItemAsync('refresh_token', '');
  
            handleSuccess('Logged out');
            dispatch(updateIsAuthenticated(false));
          } catch (error) {
            consoleError('Settings', 'HandleLogout', error);
          }
          setIsLoggingOut(false);
          resolve(); // ✅ force resolution when everything finishes
        }
      );
    });
  };
  
  const handleSignout = () => {
    CustomAlert(
      'Confirm signout', 
      'Your current session data will be erased, are you sure you want to exit your guest session?',
      async () => {
        setIsSigningOut(true)
        try {
          user && await ApiService.DeleteUser(user.id)
          AppSecureStore.SaveItemAsync('access_token', '');
          AppSecureStore.SaveItemAsync('refresh_token', '');
          AppSecureStore.SaveItemAsync('user_id', '');
          dispatch(updateIsAuthenticated(false))
          handleSuccess('Signed out')
          setIsSigningOut(false)
        } catch (error) {
          consoleError('Settings', 'SignOut Guest', error)
          setIsSigningOut(false)
        }
      })
  }

  const handleAccountDeletion = () => {
    CustomAlert(
      'Confirm Deletion', 
      'Are you sure you want to delete this user and all associated data?',
      async () => {
        setIsDeletingUser(true)
        try {
          user && await ApiService.DeleteUser(user.id)
          AppSecureStore.SaveItemAsync('access_token', '');
          AppSecureStore.SaveItemAsync('refresh_token', '');
          dispatch(updateIsAuthenticated(false))
          handleSuccess('User deleted successfully', 'The user and all associated data have been permanently deleted')
          setIsDeletingUser(false)
        } catch (error) {
          consoleError('Settings', 'Delete account', error)
          setIsDeletingUser(false)
        }
      }
    )
  }

  // Button list
  const buttonList: LayoutButton[] = [
    {
      label: 'getting started',
      iconSize: 25,
      icon: 'rocket',
      onPress: () => navigation.navigate('Tutorial'),
    },
    {
      label: user?.isGuest ? 'sign out' : 'log out',
      iconSize: 25,
      icon: 'logout',
      onPress: user?.isGuest ? handleSignout : handleLogout,
    },
    {
      label: 'delete account',
      iconSize: 25,
      icon: 'remove-circle-outline',
      color: Colors.error,
      labelColor: Colors.white,
      disabled: user?.isGuest,
      onPress: handleAccountDeletion,
    }
  ];
  

  // Spinner while logging out user
  if (isLoggingOut) return <Spinner text={'Logging out'}/>

  // Spinner while signing out guest user (deleting user in db)
  if (isSigningOut) return <Spinner text={'Signing out'}/>

  // Spinner while deleting user account 
  if (isDeletingUser) return <Spinner text={'Deleting account'}/>

  return (
    <MainLayout title='Settings'>


      <CustomFlatList
        // contentContainerStyle={[globalstyles.flexColumn, { rowGap: 30 }]}
        data={buttonList}
        itemSeparatorHeight={25}
        renderItem={({ item }) => (
          !item.disabled ?
            <ListButton
              key={item.key}
              label={item.label}
              iconSize={item.iconSize}
              icon={item.icon}
              color={item.color}
              labelColor={item.labelColor}
              // disabled={item.disabled}
              onPress={item.onPress}
            />
            :
            null
        )}
      />

    </MainLayout>
  );
}

const styles = StyleSheet.create({

});
