'use client'

import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { getMessages } from "./actions/getMessages";
import { Message, User } from "./interfaces";
import { setupSocket } from "./actions/setupSocket";
import { Button, Image, Input } from "@nextui-org/react";
import { SendIcon } from "./components/icons";
import Logo from "./components/Logo";
import * as Chat from "./components/Chat";
import { NotificationCenter } from "./components/NotificationCenter";

const Home = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<User>({ username: "", avatar: "", socketId: "" });
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

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
      const response = await getMessages();
      setMessages(response);
    }

    fetchMessages();
  }, []);

  return (
    <div className="w-full h-full overflow-hidden md:h-full md:p-8 flex flex-col md:flex-row gap-2 md:gap-8">
      <div className="hidden md:flex flex-col gap-[5rem] w-[200px] h-full">
        <Logo />

        <div className="flex flex-col gap-3">
          <h2 className="text-sm text-default-800">Your account</h2>
          <div className="flex items-center justify-between">
            <Chat.Profile
              user={user}
              tooltip
              className="items-center"
            />
            <NotificationCenter />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm text-default-800">Rooms</h2>
          <Button
            color="default"
            className="flex items-center gap-2 bg-default-100"
          >
            <span>Glavni razgovor</span>
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm text-default-800">Online users</h2>
          {onlineUsers.map((item : User) => (
            <Button
              key={item.socketId}
              color="default"
              className="flex items-center gap-2 bg-default-100"
              startContent={
                <Image src={item.avatar} alt="user-photo" className="w-[20px] h-[20px]" />
              }
            >
              <span>{item.username}</span>
            </Button>
          ))}
        </div>
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
