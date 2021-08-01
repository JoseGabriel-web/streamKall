interface userInterface {
  name: string;
  id: string;
}

interface roomInterface {
  name: string,
  participants: (userInterface | undefined)[]
}

interface messageInterface {
  sender: string,
  date: Date | number,
  message: string
}

interface socketHandlersInterface {
  io: Server,
  socket: Socket,
  getUser: getUser,
  users: userInterface[],
  createUser: createUser,
  removeUserById: removeUserById
}

type createUser = (userID: string, name: string) => userInterface;
type getUser = (userID: string) => userInterface | undefined;
type setUsername = (userID: string, name: string) => void;
type removeUserById = (socketId: string) => void;