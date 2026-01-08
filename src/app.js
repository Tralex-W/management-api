import express from "express";
import LOGGER from "./config/logger.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

const APP = express();

APP.use(helmet());
APP.use(cors());
APP.use(cookieParser());
APP.use(express.urlencoded({ extended: true }));
APP.use(
  morgan("combined", { stream: { write: (message) => LOGGER.info(message) } }),
);

APP.get("/", (req, res) => {
  LOGGER.info("TEST LOGGER");
  res.status(200).send("TEST");
});

export default APP;
