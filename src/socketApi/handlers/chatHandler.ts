import { Server, Socket } from "socket.io";

const chatHandler = (io: Server, socket: Socket, getUser:getUser) => {

  const sendChat = (message: string, room: string | string[]) => {    
    const user = getUser(socket.id)
    const name = user?.name
    const formatedMessage:String = `${name}: ${message}`
    io.to(room).emit("chat:receive", formatedMessage);
  }

  socket.on("chat:send", sendChat);
};

export default chatHandler;
