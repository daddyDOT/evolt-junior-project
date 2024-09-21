import { io, Socket } from "socket.io-client";
import { Message, User } from "../interfaces";
import { toast } from "react-toastify";

const apiUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_SOCKET_URL : undefined;

interface SocketSetupParams {
  setSocket: (socket: Socket) => void;
  updateMessages: ( { _id, user, message } : Message ) => void;
  setUser: (user: User) => void;
  setOnlineUsers: (users: User[]) => void;
  playSound: () => void;
}

export const setupSocket = ({
    setSocket,
    updateMessages,
    setUser,
    setOnlineUsers,
    playSound
  }: SocketSetupParams) => {

  const socketIo = io(apiUrl || "http://localhost:5000");
  setSocket(socketIo);

  socketIo.on("message", (data : { message: string, _id: string, user: User }) => {
    updateMessages({ ...data, createdAt: Date.now().toString() });
  });

  socketIo.on("message-notify", () => playSound);

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