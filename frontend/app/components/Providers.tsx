import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { SocketProvider } from '../contexts/SocketContext';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextUIProvider>
      <SocketProvider>
        {children}
      </SocketProvider>
    </NextUIProvider>
  );
};

export default Providers;