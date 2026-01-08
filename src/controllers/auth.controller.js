import LOGGER from "../config/logger.js";
import { FORMAT_VALIDATION_ERROR } from "../utils/formats";
import { SIGNUP_SCHEMA } from "../validations/auth.validation";

export const SINGUP = async (req, res, next) => {
  try {
    //check for schema match
    const validation_result = SIGNUP_SCHEMA.safeParse(req.body);
    if (!validation_result.success) {
      return res.status(400).json({
        message: "Validation failed",
        details: FORMAT_VALIDATION_ERROR(validation_result.error),
      });
    }

    const { name, email, role } = validation_result.data;

    LOGGER.info(`User ${email} signed up`);
    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    LOGGER.error("Signup error", error);

    if (error.message === "User with this email already exists") {
      return res.status(409).json({ message: "Email already exists" });
    }

    next(error); //forward the error to the next function in the chain
  }
};
