import { Server, Socket } from "socket.io";

const userHandler = (
  io: Server,
  socket: Socket,
  users: userInterface[],
  removeUserById: removeUserById
) => {  

  const setUsername:setUsername = (userID: String | String[], name: string) => {
    const userIndex = users.findIndex(({ id }) => userID === id)
    users[userIndex].name = name
  } 

  const renameUser = (name: string | undefined) => {
    setUsername(socket.id, name ? name : "user");
  };

  const disconnect = (reason: string) => {
    removeUserById(socket.id)
    console.log('disconnecting message',users);
  };

  socket.on("user:rename", renameUser);
  socket.on("disconnect", disconnect);
};

export default userHandler;
