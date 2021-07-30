import { Server, Socket } from "socket.io";

const roomHandler = (
  io: Server,
  socket: Socket,
  getUser: getUser,
  rooms: roomInterface[],
  createUser: createUser,
) => {
  const getRoomIndex = (roomName: string) => {
    return rooms.findIndex(({ name }) => name === roomName);
  };

  const createRoom = (room: string, user: userInterface) => {
    rooms.push({ name: room, participants: [user] });
  };

  const joinRoom = ({ room, name }: { room: string; name: string }) => {
    const user = createUser(socket.id, name);
    const message: string = `${user.name} has joined the room.`;
    const roomIndex = getRoomIndex(room);
    if (roomIndex === -1) {
      const newRoom = createRoom(room, user);
      socket.to(room).emit("room:information", newRoom);
    } else {
      rooms[roomIndex].participants.push(user);
      socket.to(room).emit("room:information", rooms[roomIndex]);
    }
    socket.join(room);
    socket.to(room).emit("room:user-join", message);
  };

  const leaveRoom = ({ room }: { room: string }) => {
    const user = getUser(socket.id);
    if (!user) return;
    const message: string = `${user.name} has left the room.`;
    socket.leave(room);
    socket.to(room).emit("room:user-leave", message);
    if (!user) return;
    const roomIndex = getRoomIndex(room);
    if (roomIndex === -1) return;
    else {
      rooms[roomIndex].participants = rooms[roomIndex].participants.filter(
        (value) => {
          return value !== user;
        },
      );
    }
  };

  socket.on("room:join", joinRoom);
  socket.on("room:leave", leaveRoom);
};

export default roomHandler;
