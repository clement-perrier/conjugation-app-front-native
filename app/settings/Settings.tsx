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

export default function Settings() {

  const navigation = useAppNavigation()

  const dispatch = useAppDispatch();

  // Selectors
  const user = useAppSelector(state => state.User.value)

  // States
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [isDeletingUser, setIsDeletingUser] = useState(false)

  // Constants
  // const accountDeletionUrl = 'https://sites.google.com/view/conjugations-app/account-deletion'

  // Handles
  // const handleLogout = async () => {
  //   return new Promise<void>((resolve) => {
  //     CustomAlert(
  //       'Confirm logout', 
  //       'Are you sure you want to logout ?',
  //       async () => {
  //         setIsLoggingOut(true)
  //         try {
  //           // TODO => Delete user refresh token
  //           const refreshToken = await AppSecureStore.GetItemAsync('refresh_token')
  //           refreshToken && await ApiService.DeleteRefreshToken(refreshToken)
  //           AppSecureStore.SaveItemAsync('access_token', '');
  //           AppSecureStore.SaveItemAsync('refresh_token', '');
  //           handleSuccess('Logged out')
  //           dispatch(updateIsAuthenticated(false))
  //         } catch (error) {
  //           consoleError('Settings', 'HandleLogout', error)
  //         }
  //         setIsLoggingOut(false)
  //         resolve()
  //       }
  //     )
  //   })
  // }
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

  // Spinner while logging out user
  if (isLoggingOut) return <Spinner text={'Logging out'}/>

  // Spinner while signing out guest user (deleting user in db)
  if (isSigningOut) return <Spinner text={'Signing out'}/>

  // Spinner while deleting user account 
  if (isDeletingUser) return <Spinner text={'Deleting account'}/>

  return (
    <MainLayout title='Settings'>

        <View style={[globalstyles.flexColumn, {rowGap: 30}]}>

          {
            user?.isGuest
              ?
                <BottomButton 
                label='sign out' 
                iconSize={25} 
                icon={'logout'} 
                onPress={handleSignout}
                />
              :
                <BottomButton 
                label='log out' 
                iconSize={25} 
                icon={'logout'} 
                onPress={handleLogout}
                />
          }

          <BottomButton 
            label='delete account'
            iconSize={25} 
            icon='remove-circle-outline' 
            color={Colors.error}
            disabled={user?.isGuest}
            onPress={handleAccountDeletion}
          />

        </View>

    </MainLayout>
  );
}

const styles = StyleSheet.create({

});
