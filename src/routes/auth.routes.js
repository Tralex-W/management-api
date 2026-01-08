import express from "express";

const ROUTER = express.Router();

ROUTER.post("/sign-up", (req, res) => {
  res.send("POST /api/auth/sign-up response");
});

ROUTER.post("/sign-in", (req, res) => {
  res.send("POST /api/auth/sign-in response");
});

ROUTER.post("/sign-out", (req, res) => {
  res.send("POST /api/auth/sign-out response");
});

export default ROUTER;
