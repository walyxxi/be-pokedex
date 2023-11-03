import express from "express";
import { routes } from "../routes/index.js";

export const web = express();

web.use(express.json());
web.use(routes);
