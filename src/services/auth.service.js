import LOGGER from "../config/logger.js";
import bcrypt from "bcrypt";
import { DB } from "../config/database.js";
import { USERS } from "../models/user.model.js";
import { eq } from "drizzle-orm";

export const HASHPASSWORD = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    LOGGER.error("Error hashing password");
    throw new Error("Error hashing password");
  }
};

export const CREATE_USER = async (name, email, password, role = "user") => {
  try {
    //check if user already exists
    const EXISTING_USER = await DB.select()
      .from(USERS)
      .where(eq(USERS.email, email))
      .limit(1);

    //error: When a user already exisits, an internal server error is thrown without any message (user already exists)
    if (EXISTING_USER.length > 0) {
      throw new Error("User with this email already exists");
    }

    //create new user
    const HASHED_PASSWORD = await HASHPASSWORD(password);
    const [NEW_USER] = await DB.insert(USERS)
      .values({
        name,
        email,
        password: HASHED_PASSWORD,
        role,
      })
      .returning();

    LOGGER.info(`User ${NEW_USER.id} created`);
    return NEW_USER;
  } catch (error) {
    if (error.message == "User with this email already exists") {
      throw new Error("User with this email already exists");
    }
    LOGGER.error("Error creating user");
    throw new Error("Error creating user");
  }
};
