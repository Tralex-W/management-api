import LOGGER from "../config/logger.js";
import { DB } from "../config/database.js";
import { USERS } from "../models/user.model.js";
import { eq } from "drizzle-orm";

export const GET_ALL_USERS = async () => {
  try {
    return await DB.select({
      id: USERS.id,
      email: USERS.email,
      name: USERS.name,
      role: USERS.role,
      createdAt: USERS.createdAt,
      updatedAt: USERS.updatedAt,
    }).from(USERS);
  } catch (error) {
    LOGGER.error("Error fetching users:", error);
    throw error;
  }
};

export const GET_USER_BY_ID = async (id) => {
  try {
    return await DB.select({
      id: USERS.id,
      email: USERS.email,
      name: USERS.name,
      role: USERS.role,
      createdAt: USERS.createdAt,
      updatedAt: USERS.updatedAt,
    })
      .from(USERS)
      .where(eq(USERS.id, id));
  } catch (error) {
    LOGGER.error("Error fetching user by ID:", error);
    throw error;
  }
};
