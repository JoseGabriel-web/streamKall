import { Server, Socket } from "socket.io";

const mediaHandler = (io: Server, socket: Socket, users: userInterface[], getUser: getUser) => {
  const streamMedia = (room: string | string[], media: any) => {
    io.to(room).emit("media:receive", { media, userID: socket.id })
  };

  socket.on("media:stream", streamMedia);
};

export default mediaHandler;
