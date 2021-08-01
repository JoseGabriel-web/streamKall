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

  let users: userInterface[] = [];

  const getUser: getUser = (userID: String) => {
    const user = users.find(({ id }) => id === userID);
    return user;
  };

  const createUser: createUser = (userID, name) => {
    const user: userInterface = { name, id: userID };
    users.push(user);
    return user;
  };

  const removeUserById = (socketId: string) => {
    users = users.filter(({ id }) => id !== socketId);
  };

  io.on("connection", (socket) => {
    handlers({io, socket, getUser, users, createUser, removeUserById});
    console.log("User connected");
  });
};

export default socketIoConfig;
