import { Server, Socket } from "socket.io";
import { getUTCDate } from "../../helpers/getUTCDate";

const chatHandler = (io: Server, socket: Socket, getUser:getUser) => {

  const sendChat = ({ message, roomName }: {message: string, roomName: string}) => {
    const user = getUser(socket.id)
    if(!user) return
    const name = user.name
    const currentDate = getUTCDate()
    const formatedMessage:messageInterface = {
      sender: name,
      date: currentDate,
      message
    }
    io.to(roomName).emit("chat:receive", formatedMessage);
  }

  socket.on("chat:send", sendChat);
};

export default chatHandler;
