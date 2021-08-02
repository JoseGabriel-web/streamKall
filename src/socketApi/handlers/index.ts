import registerRoomHandlers from "./roomHandler";
import registerChatHandlers from "./chatHandler";
import registerUserHandler from "./userHandler";

const handlers = ({
  io,
  socket,
  getUser,
  users,
  createUser,
  removeUserById
}: socketHandlersInterface) => {  
  registerUserHandler(io, socket, users, removeUserById);
  registerRoomHandlers(io, socket, getUser, createUser, removeUserById);
  registerChatHandlers(io, socket, getUser);
};

export default handlers;
