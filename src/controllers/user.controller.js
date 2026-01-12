import LOGGER from "../config/logger.js";
import {
  GET_ALL_USERS,
  GET_USER_BY_ID,
  DELETE_USER_BY_ID,
  UPDATE_USER_BY_ID,
} from "../services/user.services.js";
import { JWTTOKEN } from "../utils/jwt.js";
import { COOKIES } from "../utils/cookies.js";

export const GET_USERS = async (req, res, next) => {
  try {
    LOGGER.info("Fetching users");
    const token = COOKIES.get(req, "token") || req.headers.cookie;
    JWTTOKEN.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        LOGGER.error("Invalid token");
        res.status(401).json({
          message: "Invalid token",
        });
      }
    });

    const ALL_USERS = await GET_ALL_USERS();

    if (ALL_USERS.length === 0) {
      LOGGER.error("No users found");

      res.status(404).json({
        message: "No users found",
      });
      return;
    }

    res.status(200).json({
      message: "Users fetched successfully",
      users: ALL_USERS,
      count: ALL_USERS.length,
    });
    return;
  } catch (error) {
    LOGGER.error("Error fetching users:", error);
    res.status(500).json({
      message: "Error fetching users",
    });
    next(error);
  }
};

export const GET_USER = async (req, res, next) => {
  try {
    LOGGER.info("Fetching user by ID");
    const token = COOKIES.get(req, "token") || req.headers.cookie;
    JWTTOKEN.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        LOGGER.error("Invalid token");
        res.status(401).json({
          message: "Invalid token",
        });
      }
    });

    const USER = await GET_USER_BY_ID(req.params.id);

    if (USER.length === 0) {
      LOGGER.error("User not found");

      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      message: "User fetched successfully",
      user: USER,
    });
    return;
  } catch (error) {
    if (error.message === "User not found") {
      LOGGER.error("User not found");
      res.status(404).json({
        message: "User not found",
      });
    } else {
      LOGGER.error("Error fetching user:", error);
      res.status(500).json({
        message: "Error fetching user",
      });
    }
    next(error);
  }
};

export const DELETE_USER = async (req, res, next) => {
  try {
    LOGGER.info("Deleting User");

    const token = COOKIES.get(req, "token") || req.headers.cookie;
    const payload = JWTTOKEN.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };

    if (req.user.role != "admin") {
      LOGGER.error("Unauthorized");
      res.status(403).json({
        message: "Unauthorized",
      });
      return;
    }

    await DELETE_USER_BY_ID(req.params.id);

    res.status(204).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    if (error.message === "User not found") {
      LOGGER.error("User not found");
      res.status(404).json({
        message: "User not found",
      });
    } else {
      LOGGER.error("Error deleting user:", error);
      res.status(500).json({
        message: "Error deleting user",
      });
    }
    next(error);
  }
};

export const UPDATE_USER = async (req, res, next) => {
  try {
    const token = COOKIES.get(req, "token") || req.headers.cookie;
    const payload = JWTTOKEN.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };

    if (req.user.role != "admin") {
      LOGGER.error("Unauthorized");
      res.status(403).json({
        message: "Unauthorized",
      });
      return;
    }

    await UPDATE_USER_BY_ID(req.params.id, req.body);

    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    if (error.message == "User not found") {
      LOGGER.error("User not found");
      res.status(404).json({
        message: "User not found",
      });
    } else {
      LOGGER.error("Error updating user:", error);
      res.status(500).json({
        message: "Error updating user",
      });
    }
    next(error);
  }
};
