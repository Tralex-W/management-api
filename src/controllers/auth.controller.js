import LOGGER from "../config/logger.js";
import { CREATE_USER, LOGIN_USER } from "../services/auth.service.js";
import { FORMAT_VALIDATION_ERROR } from "../utils/formats.js";
import { SIGNUP_SCHEMA, LOGIN_SCHEMA } from "../validations/auth.validation.js";
import { JWTTOKEN } from "../utils/jwt.js";
import { COOKIES } from "../utils/cookies.js";

export const SIGNUP = async (req, res, next) => {
  try {
    //check for schema match
    const validation_result = SIGNUP_SCHEMA.safeParse(req.body);

    if (!validation_result.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: FORMAT_VALIDATION_ERROR(validation_result.error),
      });
    }

    const { name, email, password, role } = validation_result.data;
    const USER = await CREATE_USER(name, email, password, role);
    const TOKEN = JWTTOKEN.sign({ id: USER.id, email: USER.email, role });
    COOKIES.set(res, "token", TOKEN);

    LOGGER.info(`User ${email} signed up`);
    res.status(201).json({
      message: "User signed up successfully",
      user: {
        id: USER.id,
        name: USER.name,
        email: USER.email,
        role: USER.role,
      },
    });
  } catch (error) {
    LOGGER.error("Signup error", error);
    if (error.message === "User with this email already exists") {
      return res.status(409).json({ message: "Email already exists" });
    }

    next(error); //forward the error to the next function in the chain
  }
};

export const LOGIN = async (req, res, next) => {
  try {
    const VALIDATION_RESULT = LOGIN_SCHEMA.safeParse(req.body);
    if (!VALIDATION_RESULT.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: FORMAT_VALIDATION_ERROR(VALIDATION_RESULT.error),
      });
    }

    const { email, password } = VALIDATION_RESULT.data;

    const user = await LOGIN_USER(email, password);
    const TOKEN = JWTTOKEN.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    COOKIES.set(res, "token", TOKEN);

    LOGGER.info(`User ${user.id} logged in`);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    LOGGER.error("Login error", error);

    if (
      error.message === "User not found" ||
      error.message === "Invalid password"
    ) {
      return res.status(404).json({ message: "Invalide Credentials" });
    }

    next(error); //forward the error to the next function in the chain
  }
};

export const LOGOUT = async (req, res, next) => {
  try {
    COOKIES.clear(res, "token");

    LOGGER.info("User logged out successfully");
    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    LOGGER.error("Log out error", error);
    next(error);
  }
};
