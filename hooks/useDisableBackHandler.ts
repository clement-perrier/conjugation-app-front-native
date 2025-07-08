import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const useDisableBackHandler = () => {
  useFocusEffect(() => {
    const onBackPress = () => true; // Disable back button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress)

    return () => backHandler.remove(); // Cleanup when screen loses focus
  }
  );
};

export default useDisableBackHandler;