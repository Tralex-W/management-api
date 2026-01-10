import LOGGER from "../config/logger.js";
import { GET_ALL_USERS, GET_USER_BY_ID } from "../services/user.services.js";

export const GET_USERS = async (req, res, next) => {
  try {
    LOGGER.info("Fetching users");
    const ALL_USERS = await GET_ALL_USERS();

    if (ALL_USERS.length === 0) {
      LOGGER.error("No users found");

      res.status(404).json({
        message: "No users found",
      });
    }

    res.status(200).json({
      message: "Users fetched successfully",
      users: ALL_USERS,
      count: ALL_USERS.length,
    });
  } catch (error) {
    LOGGER.error("Error fetching users:", error);
    next(error);
  }
};

export const GET_USER = async (req, res, next) => {
  try {
    LOGGER.info("Fetching user by ID");
    const USER = await GET_USER_BY_ID(req.params.id);

    if (USER.length === 0) {
      LOGGER.error("User not found");

      res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User fetched successfully",
      user: USER,
    });
  } catch (error) {
    LOGGER.error("Error fetching user:", error);
    next(error);
  }
};

export const DELETE_USER = async (req, res, next) => {
  try {
  } catch {}
};

export const UPDATE_USER = async (req, res, next) => {
  try {
  } catch {}
};
