import React, { createContext, ReactElement, useEffect, useState } from 'react';
import * as Network from 'expo-network';
import { CustomAlert } from './CustomAlert';

export const ConnectivityContext = createContext({ isConnected: true });

export const ConnectivityProvider = ({ children } : { children: ReactElement }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Function to check network status
    const checkNetworkStatus = async () => {
      const { isConnected } = await Network.getNetworkStateAsync();
      isConnected && setIsConnected(isConnected);
      CustomAlert('Test', 'Test', ()=>{})
    };

    // Check initial network status
    checkNetworkStatus();

    // Set up an interval to check network status periodically
    const interval = setInterval(checkNetworkStatus, 10000); // Check every 10 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <ConnectivityContext.Provider value={{ isConnected }}>
      {children}
    </ConnectivityContext.Provider>
  );
};
