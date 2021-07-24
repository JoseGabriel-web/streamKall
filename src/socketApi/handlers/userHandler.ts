import { Server, Socket } from "socket.io";

const userHandler = (io: Server, socket: Socket, users: user[], setUsername:setUsername) => {
  const connectUser = (name: String | undefined) => {
    users.push({ name: name? name : 'user', id: socket.id });
    console.log(users);
  };

  const renameUser = (name: String | undefined) => {
    setUsername(socket.id, name? name : 'user')
  }

  const disconnect = (reason: String) => {
    users = users.filter(({ id }) => id !== socket.id);
    console.log(users);
  };

  socket.on("user:connect", connectUser);
  socket.on("user:rename", renameUser);
  socket.on("disconnect", disconnect);
};

export default userHandler;
