import express from "express";
import {
  GET_USERS,
  GET_USER,
  DELETE_USER,
  UPDATE_USER,
} from "../controllers/user.controller.js";

const ROUTER = express.Router();

ROUTER.get("/", GET_USERS);
ROUTER.get("/:id", GET_USER);

export default ROUTER;
