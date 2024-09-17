'use client'

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getMessages } from "./actions/getMessages";
import { Message, User } from "./interfaces";

const Home = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<User>({ username: "", avatar: "" });
  const [onlineUsers, setOnlineUsers] = useState([]);

  const sendMessage = () => {
    socket?.emit("message", { user, message});
    setMessage("");
  }

  const updateMessages = ({ _id, user, message } : { _id: string, user: { username: string, name: string }, message: string}) => {
    setMessages((prev) => [...prev, { _id, user, message, createdAt: Date.now().toString() }]);
  }

  useEffect(() => {
    const socketIo = io("http://localhost:5000");
    setSocket(socketIo);

    socketIo.on("message", (data) => {
      alert("New message");
      updateMessages({...data, createdAt: Date.now().toString()});
    });

    socketIo.on("send-socket-id", (data) => {
      setUser(data.user);
      setOnlineUsers(data.onlineUsers);
    });

    socketIo.on("user-connected", (data) => {
      alert(`User ${data.user.username} connected`);
      setOnlineUsers(data.onlineUsers);
    });

    socketIo.on("remove-socket-id", (data) => {
      alert("User disconnected");
      setOnlineUsers(data.onlineUsers);
    });

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
