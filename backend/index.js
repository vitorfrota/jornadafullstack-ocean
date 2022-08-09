import "dotenv/config";
import express from "express";
import { routes } from "./routes.js";

const app = express();
app.use(routes);

app.listen(process.env.APP_PORT);
