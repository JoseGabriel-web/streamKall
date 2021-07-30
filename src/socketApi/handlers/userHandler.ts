import { Server, Socket } from "socket.io";

const userHandler = (
  io: Server,
  socket: Socket,
  users: userInterface[]
) => {  

  const setUsername:setUsername = (userID: String | String[], name: string) => {
    const userIndex = users.findIndex(({ id }) => userID === id)
    users[userIndex].name = name
  } 

  const renameUser = (name: string | undefined) => {
    setUsername(socket.id, name ? name : "user");
  };

  const disconnect = (reason: string) => {
    users = users.filter(({ id }) => id !== socket.id);
    console.log(users);
  };

  socket.on("user:rename", renameUser);
  socket.on("disconnect", disconnect);
};

export default userHandler;
