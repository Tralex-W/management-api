import express from "express";
import { SIGNUP, LOGIN, LOGOUT } from "../controllers/auth.controller.js";

const ROUTER = express.Router();

ROUTER.post("/sign-up", SIGNUP);

ROUTER.post("/sign-in", LOGIN);

ROUTER.post("/sign-out", LOGOUT);

export default ROUTER;
