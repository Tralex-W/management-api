import express from "express";

const APP = express();

APP.get("/", (req, res) => {
  res.status(200).send("TEST");
});

export default APP;
