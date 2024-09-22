'use client'

import { useEffect, useRef } from "react";
import { getMessages, setupSocket } from "./actions";
import { Message, MessageList } from "./interfaces";
import { useSocketContext } from "./contexts/SocketContext";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content";

const Home = () => {
  const {
    setSocket,
    setMessages,
    setUser,
    setOnlineUsers
  } = useSocketContext();

  const audioPlayer = useRef<HTMLAudioElement>(null);

  const playSound = () => {
    if (audioPlayer.current) {
      audioPlayer.current.play()
    } else {
      console.error("Audio player not found");
    }
  }

  useEffect(() => {
    const socketIo = setupSocket({
      setSocket,
      setMessages,
      setUser,
      setOnlineUsers,
      playSound
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const apiUrl = process.env.NODE_ENV == 'production' ? String(process.env.NEXT_PUBLIC_API_URL) : "http://localhost:5000";

      const response : Message[] = await getMessages(apiUrl);
      setMessages((prevMessages : MessageList) => {
        const updatedMessages = { ...prevMessages };
        if (!updatedMessages['main']) {
          updatedMessages['main'] = [];
        }
        updatedMessages['main'].push(...response);
        return updatedMessages;
      });
    }

    fetchMessages();
  }, []);

  return (
    <div className="w-full h-full overflow-hidden md:h-full md:p-8 flex flex-col md:flex-row gap-2 md:gap-8">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <Content />
      <audio ref={audioPlayer} src='./notification.mp3' />
    </div>
  );
}

export default Home;
