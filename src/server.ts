import app from "./app";
import socketIoConfig from "./socketApi/socketIo";
import http from "http";
import https from "https";
import { enviroment, port } from "./config";

if (enviroment === "production") {
  const httpsServer = https.createServer({}, app);
  socketIoConfig(httpsServer);

  httpsServer.listen(port, () => {
    console.log(`HTTPS server running on port ${port}`);
  });
} else {
  const httpServer = http.createServer({}, app);
  socketIoConfig(httpServer);

  httpServer.listen(port, () => {
    console.log(`HTTP server running on port ${port}`);
  });
}
