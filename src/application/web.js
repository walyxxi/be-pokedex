import express from "express";
import { routes } from "../route/index.js";
import { errorMiddleware } from "../middleware/error-middleware.js";

export const web = express();

web.use(express.json());
web.use(routes);

web.use(errorMiddleware);
