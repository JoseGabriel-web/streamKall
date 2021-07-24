import { Server, Socket } from "socket.io";

const roomHandler = (io: Server, socket: Socket, users: user[], getUser: getUser) => {
  const joinRoom = (room: string | string[]) => {
    const user = getUser(socket.id)
    const message: String = `${user?.name} has joined the room.`;
    socket.join(room);
    socket.to(room).emit("room:user-join", message);
  };

  const leaveRoom = (room: string) => {
    const user = getUser(socket.id)
    const message: String = `${user?.name} has left the room.`;
    socket.leave(room);
    socket.to(room).emit("room:user-leave", message);
  };

  socket.on("room:join", joinRoom);
  socket.on("room:leave", leaveRoom);
};

export default roomHandler;
