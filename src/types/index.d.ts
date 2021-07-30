interface userInterface {
  name: string;
  id: string;
}

interface roomInterface {
  name: string,
  participants: userInterface[]
}

interface messageInterface {
  sender: string,
  date: Date | number,
  message: string
}

type createUser = (userID: string, name: string) => userInterface;
type getUser = (userID: string) => userInterface | undefined;
type setUsername = (userID: string, name: string) => void;