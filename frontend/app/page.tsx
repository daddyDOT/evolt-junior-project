'use client'

import { useEffect, useRef } from "react";
import { getMessages } from "./actions/getMessages";
import { Message, MessageList, UpdatedMessages } from "./interfaces";
import { setupSocket } from "./actions/setupSocket";
import { useSocketContext } from "./contexts/SocketContext";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content";
import { toast } from "react-toastify";

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
  
  const updateMessages = ({ _id, user, message, createdAt, to } : UpdatedMessages) => {

    setMessages((prevMessages : MessageList) => {
      const updatedMessages = { ...prevMessages };
      if (!updatedMessages[to || 'main']) {
        updatedMessages[to || 'main'] = [];

        if (to) {
          toast.info(`You received a new private message from: ${user.username}`);
        }
      }
      updatedMessages[to || 'main'] = [
        {
          _id,
          user,
          message,
          createdAt
        },
        ...updatedMessages[to || 'main']
      ];

      return updatedMessages;
    });
  }

  useEffect(() => {
    const socketIo = setupSocket({
      setSocket,
      updateMessages,
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
