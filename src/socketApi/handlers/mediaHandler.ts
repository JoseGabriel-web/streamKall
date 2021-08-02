import { Server, Socket } from "socket.io";

const mediaHandler = (io: Server, socket: Socket, users: userInterface[], getUser: getUser) => {
  
  const streamMedia = (media: any) => {
    io.to(socket.data.currentRoom).emit("media:receive", { media, userID: socket.id })
  };

  socket.on("media:stream", streamMedia);
};

export default mediaHandler;
