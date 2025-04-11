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

  // Constants
  const accountDeletionUrl = 'https://sites.google.com/view/conjugations-app/account-deletion'

  // Handles
  const handleLogout = () => {
    CustomAlert(
      'Confirm logout', 
      'Are you sure you want to logout ?',
      () => {
          AppSecureStore.SaveItemAsync('access_token', '');
          AppSecureStore.SaveItemAsync('refresh_token', '');
          dispatch(updateIsAuthenticated(false))
      }
    )
  }

  const handleSignout = () => {
    CustomAlert(
      'Confirm signout', 
      'Your current session data will be erased, are you sure you want to exit your guest session?',
      async () => {
        try {
          user && await ApiService.DeleteUser(user.id)
          AppSecureStore.SaveItemAsync('access_token', '');
          AppSecureStore.SaveItemAsync('refresh_token', '');
          handleSuccess('Signed out')
          dispatch(updateIsAuthenticated(false))
        } catch (error) {
          consoleError('Settings', 'SignOut Guest', error)
        }
      })
  }

  const handleAccountDeletion = () => {
    CustomAlert(
      'Confirm Deletion', 
      'Are you sure you want to delete this user and all associated data?',
      () => {
        try {
          user && ApiService.DeleteUser(user.id)
        } catch (error) {
            consoleError('Settings', 'Delete account', error)
        }
        dispatch(updateIsAuthenticated(false))
        handleSuccess('User deleted successfully', 'The user and all associated data have been permanently deleted')
      }
    )
  }

  return (
    <MainLayout title='Settings'>

        <View style={globalstyles.flexColumn}>

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
