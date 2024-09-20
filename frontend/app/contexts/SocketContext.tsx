'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Socket } from 'socket.io-client';

interface User {
  username: string;
  avatar: string;
  socketId?: string;
}

interface Message {
  _id: string;
  user: User;
  message: string;
  createdAt: string;
}

interface SocketContextProps {
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  onlineUsers: User[];
  setOnlineUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<User>({ username: "", avatar: "", socketId: "" });
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

  return (
    <SocketContext.Provider value={{ socket, setSocket, messages, setMessages, user, setUser, onlineUsers, setOnlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocketContext must be used within a SocketProvider');
  }
  return context;
};