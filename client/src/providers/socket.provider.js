// SocketContext.js
import React, { createContext, useContext, useEffect } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();
const socket = io('http://localhost:8080'); 

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    return () => {
      socket.disconnect(); 
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
