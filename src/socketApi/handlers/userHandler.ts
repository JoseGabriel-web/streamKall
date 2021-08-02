import { Server, Socket } from "socket.io";

const userHandler = (
  io: Server,
  socket: Socket,
  users: Map<String | string, userInterface>,
  removeUserById: removeUserById
) => {  

  const renameUser = (name: string) => {
    users.set(socket.id, { name, id: socket.id })
  };

  const disconnect = (reason: string) => {
    console.log(socket.data.name, 'is the user disconnected')    
    socket.emit("room:leave")
    removeUserById(socket.id)    
  };

  socket.on("user:rename", renameUser);
  socket.on("disconnect", disconnect);
};

export default userHandler;
