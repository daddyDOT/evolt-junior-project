import { io, Socket } from "socket.io-client";
import { Message, User } from "../interfaces";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
interface SocketSetupParams {
  setSocket: (socket: Socket) => void;
  updateMessages: ( { _id, user, message } : Message ) => void;
  setUser: (user: User) => void;
  setOnlineUsers: (users: User[]) => void;
}

export const setupSocket = ({
    setSocket,
    updateMessages,
    setUser,
    setOnlineUsers
  }: SocketSetupParams) => {

  const socketIo = io(`${apiUrl}`);
  setSocket(socketIo);

  socketIo.on("message", (data : { message: string, _id: string, user: User }) => {
    alert("New message");
    updateMessages({ ...data, createdAt: Date.now().toString() });
  });

  socketIo.on("send-socket-id", (data) => {
    setUser(data.user);
    setOnlineUsers(data.onlineUsers);
  });

  socketIo.on("user-connected", (data) => {
    alert(`User ${data.user.username} connected`);
    setOnlineUsers(data.onlineUsers);
  });

  socketIo.on("remove-socket-id", (data) => {
    alert("User disconnected");
    setOnlineUsers(data.onlineUsers);
  });

  return socketIo;
};