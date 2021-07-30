import { Server, Socket } from "socket.io";
import registerRoomHandlers from "./roomHandler";
import registerChatHandlers from "./chatHandler";
import registerUserHandler from "./userHandler";

const handlers = (
  io: Server,
  socket: Socket,
  getUser: getUser,
  users: userInterface[],
  rooms: roomInterface[],
  createUser: createUser,
) => {  
  registerUserHandler(io, socket, users);
  registerRoomHandlers(io, socket, getUser, rooms, createUser);
  registerChatHandlers(io, socket, getUser);
};

export default handlers;
