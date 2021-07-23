import express from "express";
import cors from "cors";
import { corsUrl } from "./config";
import routesV1 from "./routes/v1/index";
const app = express();

app.use(express.json());
app.use(cors({ origin: corsUrl }));
app.use("/v1", routesV1);

export default app;
