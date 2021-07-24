import { Server, Socket } from "socket.io";
import registerRoomHandlers from "./roomHandler";
import registerChatHandlers from "./chatHandler";
import registerUserHandler from "./userHandler";

const handlers = (
  io: Server,
  socket: Socket,
  users: user[],
  getUser: getUser,
  setUsername: setUsername,
) => {
  registerUserHandler(io, socket, users, setUsername);
  registerRoomHandlers(io, socket, users, getUser);
  registerChatHandlers(io, socket, getUser);
};

export default handlers;
