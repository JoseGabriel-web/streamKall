import app from "./app";
import http from "http";
import { port } from "./config";

const httpServer = http.createServer({}, app);
httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
