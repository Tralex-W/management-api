import express from "express";
import LOGGER from "./config/logger.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";

const APP = express();

//middleware
APP.use(helmet());
APP.use(cors());
APP.use(cookieParser());
APP.use(express.urlencoded({ extended: true }));
APP.use(
  morgan("combined", { stream: { write: (message) => LOGGER.info(message) } }),
);

//routes
APP.use("/api/auth", authRoutes);

//endpoints
APP.get("/", (req, res) => {
  LOGGER.info("TEST LOGGER");
  res.status(200).send("TEST");
});

APP.get("/api", (req, res) => {
  res.status(200).json({ message: "API TEST" });
});

APP.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default APP;
