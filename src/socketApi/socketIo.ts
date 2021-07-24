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

  let users: user[] = [];

  const getUser:getUser = (userID: String | String[]) => {
    const user = users.find(({ id }) => id === userID);
    return user;
  };

  const setUsername:setUsername = (userID: String | String[], name: String | undefined) => {
    const userIndex = users.findIndex(({ id }) => userID === id)
    users[userIndex].name = name
  }

  io.on("connection", (socket: Socket) => {    
    handlers(io, socket, users, getUser, setUsername);
  });
};

export default socketIoConfig;
