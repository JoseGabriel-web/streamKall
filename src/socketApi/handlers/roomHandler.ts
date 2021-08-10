import { Server, Socket } from "socket.io";

const roomHandler = (
  io: Server,
  socket: Socket,
  getUser: getUser,
  createUser: createUser,
  removeUserById: removeUserById,
) => {
  const getRoomParticipants = () => {
    let participants: (userInterface | undefined)[] = [];
    let sockets = io.sockets.adapter.rooms.get(socket.data.currentRoom);
    if (!sockets) return [];
    sockets.forEach((socketID) => {
      const participant = getUser(socketID);
      participants.push(participant);
    });
    return participants;
  };

  const getRoomInformation = (): roomInterface => {
    const roomInformation: roomInterface = {
      name: socket.data.currentRoom,
      participants: getRoomParticipants(),
    };
    return roomInformation;
  };

  const emitPeerUsers = () => {
    let usersInRoom = io.sockets.adapter.rooms.get(socket.data.currentRoom);
    if (usersInRoom) {
      const filteredUsersInRoom = Array.from(usersInRoom).filter(
        (id) => String(id) !== String(socket.id),
      );
      socket.emit("peer:users", filteredUsersInRoom);
    }
  };

  const joinRoom = ({ room, name }: { room: string; name: string }) => {
    createUser(socket.id, name);
    const user = getUser(socket.id);
    if (!user) return;
    const message: string = `${user.name} has joined the room.`;
    socket.join(room);
    socket.data.name = name;
    socket.data.currentRoom = room;
    const roomInformation = getRoomInformation();
    io.to(room).emit("room:information", roomInformation);
    socket.to(room).emit("room:user-join", message);
    emitPeerUsers();
  };

  const leaveRoom = () => {
    const user = getUser(socket.id);
    if (!user) return;
    const message: string = `${user.name} has left the room.`;
    removeUserById(user.id);
    socket.leave(socket.data.currentRoom);
    const roomInformation = getRoomInformation();
    io.to(socket.data.currentRoom).emit("room:information", roomInformation);
    socket.to(socket.data.currentRoom).emit("room:user-leave", message);
    socket.to(socket.data.currentRoom).emit("peer:leave", socket.id);
  };

  const provideUser = (socketID: string) => {
    const user = getUser(socketID);
    socket.emit(`room:provide:user:${socketID}`, user);
  };

  socket.on("room:join", joinRoom);
  socket.on("room:get:users", emitPeerUsers);
  socket.on("room:get:user", provideUser);
  socket.on("room:leave", leaveRoom);
};

export default roomHandler;
