'use client'

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const Home = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const socketIo = io("http://localhost:5000");
    setSocket(socketIo);

    socketIo.on("message", (data) => {
      alert("Nova poruka: " + data);
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket?.emit("message", message);
    setMessage("");
  }

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
    </div>
  );
}

export default Home;
