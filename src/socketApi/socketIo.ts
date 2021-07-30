import { Server, Socket } from "socket.io";
import http from "http";
import https from "https";
import handlers from "./handlers";

const socketIoConfig = (server: http.Server | https.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });  

  const users: userInterface[] = [];
  const rooms: roomInterface[] = []

  const getUser:getUser = (userID: String) => {
    const user = users.find(({ id }) => id === userID);
    return user;
  };  

  const createUser: createUser = (userID, name) => {
    const user: userInterface = { name, id: userID }
    users.push(user)
    console.log(users)
    return user
  }

  io.on("connection", (socket) => {    
    handlers(io, socket, getUser, users, rooms, createUser);
    console.log('User connected')
  });
};

export default socketIoConfig;
