interface user {
  name: String | undefined;
  id: String;
}

type getUser = (userID: String | String[]) => user | undefined;
type setUsername = (userID: String | String[], name: String | undefined) => void;