import { User } from "@/app/interfaces";

import { useSocketContext } from "@/app/contexts/SocketContext";
import { Button, Image, ScrollShadow } from "@nextui-org/react";
import { NotificationCenter } from "../NotificationCenter";
import * as Chat from "../Chat";
import Logo from '../Logo'

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ mobile, onClose } : SidebarProps) => {
  const { user, onlineUsers, activeChat, setActiveChat, seenOffset, messages } = useSocketContext();

  const UnseenBubble = ({ item } : { item : User }) => {
    const liveCount = messages?.[String(item.socketId)]?.length || 0;
    const seenCount = seenOffset[String(item.socketId)] || 0;

    if (liveCount-seenCount === 0 || activeChat[0].includes(String(item.socketId))) return null;

    return (
      <span className="text-xs bg-primary-500 text-white px-2 py-[1px] rounded-full">
        {liveCount-seenCount}
      </span>
    )
  }

  return (
    <div className="flex flex-col gap-[2rem] w-full md:w-[200px] h-full">
      {mobile ? (
        <div className='w-full flex justify-between items-center'>
          <Logo />
          <Button
            variant="light"
            size="sm"
            isIconOnly
            onClick={onClose}
          >
            X
          </Button>
        </div>
      ) : (
        <Logo />
      )}

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
          className={
            "flex items-center gap-2" + (
              activeChat[0] === "main" ? " bg-default-200" : " bg-default-100"
            )
          }
          onClick={() => {
            setActiveChat(["main"]);
            onClose && onClose();
          }}
        >
          <span>Glavni razgovor</span>
        </Button>
      </div>

      <h2 className="text-sm text-default-800 -mb-[2rem]">Online users</h2>
      <ScrollShadow hideScrollBar>
        {onlineUsers.map((item : User) => item.socketId !== user.socketId && (
          <Button
            key={item.socketId}
            color="default"
            onClick={() => {
              setActiveChat([String(item.socketId + item.username)])
              onClose && onClose();
            }}
            className={
              "flex items-center gap-2 w-full my-3" + (
                activeChat[0].includes(String(item.socketId)) ? " bg-default-200" : " bg-default-100"
              )
            }
            startContent={
              <Image src={item.avatar} alt="user-photo" className="w-[20px] h-[20px]" />
            }
            endContent={<UnseenBubble item={item} />}
          >
          <span>{item.username}</span>
          </Button>
        ))}
      </ScrollShadow>
    </div>
  )
}

export default Sidebar