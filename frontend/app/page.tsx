'use client'

import { useEffect, useRef, useState } from "react";
import { getMessages } from "./actions/getMessages";
import { Message } from "./interfaces";
import { setupSocket } from "./actions/setupSocket";
import { Button, Input } from "@nextui-org/react";
import { useSocketContext } from "./contexts/SocketContext";
import { SendIcon } from "./components/icons";
import * as Chat from "./components/Chat";
import Sidebar from "./components/Sidebar/Sidebar";

const Home = () => {
  const {
    socket, setSocket,
    messages, setMessages,
    user, setUser,
    setOnlineUsers
  } = useSocketContext();

  const [message, setMessage] = useState<string>("");

  const audioPlayer = useRef<HTMLAudioElement>(null);

  const playSound = () => {
    if (audioPlayer.current) {
      audioPlayer.current.play()
    } else {
      console.error("Audio player not found");
    }
  }

  const sendMessage = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!message) return;
    socket?.emit("message", {
      user,
      message
    });
    setMessage("");
  }

  const updateMessages = ({ _id, user, message, createdAt } : Message) => {
    setMessages((prev) => [
      {
        _id,
        user,
        message,
        createdAt
      },
      ...prev
    ]);
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

      const response = await getMessages(apiUrl);
      setMessages(response);
    }

    fetchMessages();
  }, []);

  return (
    <div className="w-full h-full overflow-hidden md:h-full md:p-8 flex flex-col md:flex-row gap-2 md:gap-8">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <Chat.Base
        heading="General chat"
        description="Open to everyone, only halal talk allowed"
      >
        <Chat.Messages>
          {messages.map((item) => (
            <Chat.Bubble key={item._id} {...item} />
          ))}
        </Chat.Messages>
        <form className="flex justify-between items-center gap-4" onSubmit={sendMessage}>
          <Input
            placeholder="Write a message..."
            value={message}
            variant="bordered"
            size="lg"
            radius="full"
            onChange={(e) => setMessage(e.target.value)}
            className="w-full"
            classNames={{
              inputWrapper: "border-[1px]",
              innerWrapper: "text-default-900"
            }}
          />
          <Button
            type="submit"
            variant="solid"
            isIconOnly
            size="lg"
            radius="full"
            className=""
          >
            <SendIcon className="text-primary-900 text-xs" />
          </Button>
        </form>
      </Chat.Base>
      <audio ref={audioPlayer} src='./notification.mp3' />
    </div>
  );
}

export default Home;
