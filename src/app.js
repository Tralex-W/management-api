import express from "express";
import LOGGER from "./config/logger.js";

const APP = express();

APP.get("/", (req, res) => {
  LOGGER.info("TEST LOGGER");
  res.status(200).send("TEST");
});

export default APP;
