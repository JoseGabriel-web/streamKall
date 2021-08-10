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

  let users: Map<String | string, userInterface> = new Map();

  const getUser: getUser = (userID: String) => {
    return users.get(userID);
  };

  const createUser: createUser = (userID, name) => {    
    users.set(userID, { name, id: userID })
    return getUser(userID);
  };

  const removeUserById = (socketId: string) => {
    users.delete(socketId)
  };

  io.on("connection", (socket) => {
    handlers({io, socket, getUser, users, createUser, removeUserById});    
    console.log("User connected");
  });
};

export default socketIoConfig;
