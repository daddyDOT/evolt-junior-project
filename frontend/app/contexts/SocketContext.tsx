'use client'

import { createContext, useContext, useState, ReactNode } from 'react';
import { Socket } from 'socket.io-client';
import { Message, User } from '../interfaces';

interface MessagesInterface {
  [key: string]: Message[];
}

interface SocketContextProps {
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
  messages: MessagesInterface;
  setMessages: React.Dispatch<React.SetStateAction<MessagesInterface>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  onlineUsers: User[];
  setOnlineUsers: React.Dispatch<React.SetStateAction<User[]>>;
  activeChat: string[];
  setActiveChat: React.Dispatch<React.SetStateAction<string[]>>;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<MessagesInterface>({ main: [] });
  const [user, setUser] = useState<User>({ username: "", avatar: "", socketId: "" });
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [activeChat, setActiveChat] = useState<string[]>(["main"]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket,
        messages,
        setMessages,
        user,
        setUser,
        onlineUsers,
        setOnlineUsers,
        activeChat,
        setActiveChat
      }}
    >
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