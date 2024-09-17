'use client'

import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { getMessages } from "./actions/getMessages";
import { Message, User } from "./interfaces";
import { setupSocket } from "./actions/setupSocket";

const Home = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<User>({ username: "", avatar: "" });
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

  const sendMessage = () => {
    socket?.emit("message", { user, message});
    setMessage("");
  }

  const updateMessages = ({ _id, user, message } : { _id: string, user: User, message: string}) => {
    setMessages((prev) => [...prev, { _id, user, message, createdAt: Date.now().toString() }]);
  }

  useEffect(() => {
    const socketIo = setupSocket({ setSocket, updateMessages, setUser, setOnlineUsers });
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await getMessages();
      setMessages(response);
    }

    fetchMessages();
  }, []);

  return (
    <div>
      <h1>Frontend initial commit...</h1>
      <input
        placeholder="Write a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="button" onClick={sendMessage}>
        Send
      </button>
      <hr />
      {messages.map((item) => (
          <p key={item._id}>{item.user.username} - {item.message}</p>
        )
      )}
      <hr />
      <h2>Online Users</h2>
      {onlineUsers.map((item : User) => (
        <p key={item.socketId}>{item.username}</p>
      ))}
    </div>
  );
}

export default Home;
