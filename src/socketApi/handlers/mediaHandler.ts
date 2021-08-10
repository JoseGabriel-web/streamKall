import { Server, Socket } from "socket.io";

const mediaHandler = (io: Server, socket: Socket, users: userInterface[], getUser: getUser) => {
  
  const streamMedia = ( signalData: any ) => {
    console.log(`${socket.data.currentRoom} is the room to stream media.`)
    io.to(socket.data.currentRoom).emit("media:receive", { signalData, userStreamingID: socket.id })
  };

  socket.on("media:stream", streamMedia);
};

export default mediaHandler;
