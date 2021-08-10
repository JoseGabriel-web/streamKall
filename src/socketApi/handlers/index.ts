import registerRoomHandlers from "./roomHandler";
import registerChatHandlers from "./chatHandler";
import registerUserHandler from "./userHandler";
import registerMediaHandler from "./mediaHandler";
import registerPeerHandler from "./peerHandler";

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
  registerMediaHandler(io, socket, users, getUser)
  registerPeerHandler(io, socket)
};

export default handlers;
