import { Server, Socket } from "socket.io";

const roomHandler = (
  io: Server,
  socket: Socket,
  getUser: getUser,
  createUser: createUser,
) => {

  const getRoomParticipants = async (room: string) => {
    let participants: (userInterface | undefined)[] = []
    let sockets = await io.of(room).in('general').allSockets()
    sockets.forEach(socket => {
      const participant = getUser(socket)
      participants.push(participant)
    })
    return participants
  };

  const getRoomInformation = async (roomName: string): Promise<roomInterface> => {
    const roomInformation: roomInterface = {
      name: roomName,
      participants: await getRoomParticipants(roomName)
    }
    return roomInformation
  }

  const joinRoom = async ({ room, name }: { room: string; name: string }) => {
    const user = createUser(socket.id, name);
    const message: string = `${user.name} has joined the room.`;
    socket.join(room);
    io.to(room).emit("room:information", await getRoomInformation(room))
    socket.to(room).emit("room:user-join", message);
  };

  const leaveRoom = async ({ roomName }: { roomName: string }) => {
    console.log("leaving room")
    const user = getUser(socket.id);
    if (!user) return;
    const message: string = `${user.name} has left the room.`;
    socket.leave(roomName);
    io.to(roomName).emit("room:information", await getRoomInformation(roomName))    
    // io.to(roomName).emit("room:user-leave", message)
    socket.to(roomName).emit("room:user-leave", message);
  };

  socket.on("room:join", joinRoom);
  socket.on("room:leave", leaveRoom);
};

export default roomHandler;
