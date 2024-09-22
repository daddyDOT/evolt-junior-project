import { io, Socket } from "socket.io-client";
import { MessageList, User } from "../interfaces";
import { toast } from "react-toastify";
import { updateMessages } from "./updateMessages";

const apiUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_SOCKET_URL : undefined;

interface SocketSetupParams {
  setSocket: (socket: Socket) => void;
  setMessages: React.Dispatch<React.SetStateAction<MessageList>>;
  setUser: (user: User) => void;
  setOnlineUsers: (users: User[]) => void;
  playSound: () => void;
}

export const setupSocket = ({
    setSocket,
    setMessages,
    setUser,
    setOnlineUsers,
    playSound
  }: SocketSetupParams) => {

  const socketIo = io(apiUrl || "http://localhost:5000");
  setSocket(socketIo);

  socketIo.on("message", (data : { message: string, _id: string, user: User }) => {
    updateMessages({ ...data, createdAt: Date.now().toString(), setStateAction: setMessages });
  });

  socketIo.on("private message", (data : { message: string, user: User, first : boolean }) => {
    updateMessages({ ...data, createdAt: Date.now().toString(), to: data.user.socketId, setStateAction: setMessages });

    if (data.first === true) {
      toast.info(`You received a new private message from: ${data.user.username}`);
    }

    playSound();
  });

  socketIo.on("message notify", () => {
    playSound()
  });

  socketIo.on("send-socket-id", (data) => {
    setUser(data.user);
    setOnlineUsers(data.onlineUsers);
  });

  socketIo.on("user-connected", (data) => {
    toast.info(`${data.user.username} connected`);
    setOnlineUsers(data.onlineUsers);
  });

  socketIo.on("remove-socket-id", (data) => {
    toast.info(`User ${data.user} disconnected`);
    setOnlineUsers(data.onlineUsers);
  });

  return socketIo;
};