import LOGGER from "../config/logger.js";
import { GET_ALL_USERS, GET_USER_BY_ID } from "../services/user.services.js";
import { JWTTOKEN } from "../utils/jwt.js";
import { COOKIES } from "../utils/cookies.js";
//! NEED VERIFICATION with JWTTOKE.verify
//Send Error Http Code in catch block

export const GET_USERS = async (req, res, next) => {
  try {
    LOGGER.info("Fetching users");

    JWTTOKEN.verify(
      COOKIES.get(req, "token"),
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          LOGGER.error("Invalid token");
          res.status(401).json({
            message: "Invalid token",
          });
        }
      },
    );

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

    console.log("req", req);

    JWTTOKEN.verify(
      COOKIES.get(req, "token"),
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          LOGGER.error("Invalid token");
          res.status(401).json({
            message: "Invalid token",
          });
        }
      },
    );

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
    if (error.message === "User not found") {
      LOGGER.error("User not found");
      res.status(404).json({
        message: "User not found",
      });
    } else {
      LOGGER.error("Error fetching user:", error);
      next(error);
    }
  }
};
