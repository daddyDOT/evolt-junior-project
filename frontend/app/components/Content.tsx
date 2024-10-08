import { useEffect, useRef, useState } from "react";
import { useInView } from 'react-intersection-observer'
import { Button, Input } from "@nextui-org/react";
import { useSocketContext } from "../contexts/SocketContext";
import { SendIcon } from "./icons";
import { toast } from "react-toastify";
import { updateMessages } from "../actions/updateMessages";
import * as Chat from "./Chat";

const Content = () => {
  const {
    socket,
    messages,
    setMessages,
    user,
    activeChat,
    setSeenOffset
  } = useSocketContext();

  const [message, setMessage] = useState<string>("");
  const [chatItem, setChatItem] = useState<string>("main");
  const [limit, setLimit] = useState<number>(10);

  const { ref, inView } = useInView();
  const inputRef = useRef<HTMLInputElement>(null);

  const
    chatName = activeChat[0] === "main" ? "General chat" : ("User" + activeChat[0].split("User")[1]),
    privateChat = activeChat[0] !== "main";
  ;

  useEffect(() => {
    const messageLength = messages[chatItem]?.length || 0;
    setSeenOffset((prev) => ({ ...prev, [chatItem]: messageLength }));
  }, [chatItem, messages, setSeenOffset]);

  useEffect(() => {
    if (inView && limit < (messages[chatItem] || []).length) {
      setLimit((prev) => prev + 10);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  useEffect(() => {
    const item = activeChat[0] === "main" ? "main" : activeChat[0].split("User")[0];
    setChatItem(item);
  }, [activeChat]);

  const sendMessage = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!message) return;
    
    if (privateChat) {
      socket?.emit("private message", {
        user,
        message,
        to: chatItem,
        first: !messages[chatItem]
      });

      if (!messages[chatItem]) {
        toast.info(`You started a private chat with: ${chatName}`);
      }

      updateMessages({ user, message, createdAt: Date.now().toString(), to: chatItem, setStateAction: setMessages });
    } else {
      socket?.emit("message", {
        user,
        message
      });
    }

    inputRef.current?.focus();

    setMessage("");
  }

  return (
    <Chat.Base
      heading={chatName}
      description={chatItem === "main" ? "Open to everyone, only halal talk allowed" : chatItem}
    >
      <Chat.Messages>
        {(messages[chatItem] || []).slice(0, limit).map((item, index) => (
          <Chat.Bubble key={index} {...item} />
        ))}
        <div ref={ref} />
      </Chat.Messages>
      <form className="flex justify-between items-center gap-4" onSubmit={sendMessage}>
        <Input
          placeholder="Write a message..."
          value={message}
          variant="bordered"
          ref={inputRef}
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
  )
}

export default Content