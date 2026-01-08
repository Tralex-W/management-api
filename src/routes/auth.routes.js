import express from "express";
import { SIGNUP } from "../controllers/auth.controller.js";

const ROUTER = express.Router();

ROUTER.post("/sign-up", SIGNUP);

ROUTER.post("/sign-in", (req, res) => {
  res.send("POST /api/auth/sign-in response");
});

ROUTER.post("/sign-out", (req, res) => {
  res.send("POST /api/auth/sign-out response");
});

export default ROUTER;
