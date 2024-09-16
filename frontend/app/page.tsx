'use client'

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getMessages } from "./actions/getMessages";
import { getRandomName } from "./actions/getRandomName";
import { Message, Name } from "./interfaces";

const Home = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<Name>({ username: "", name: "" });

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
      updateMessages({...data, createdAt: Date.now().toString()});
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMessages();
      const user = await getRandomName();
      setMessages(data);
      setUser(user);
    }

    fetchData();
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
      {messages.map((item) => 
      {
        console.log("item", item);
        return (
          <p key={item._id}>{item.user.name} - {item.message}</p>
        )
      })}
    </div>
  );
}

export default Home;
