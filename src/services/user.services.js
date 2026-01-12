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
    throw new Error(error);
  }
};

export const GET_USER_BY_ID = async (id) => {
  try {
    const [user] = await DB.select({
      id: USERS.id,
      email: USERS.email,
      name: USERS.name,
      role: USERS.role,
      createdAt: USERS.createdAt,
      updatedAt: USERS.updatedAt,
    })
      .from(USERS)
      .where(eq(USERS.id, id))
      .limit(1);

    if (!user) {
      throw new Error("User not found", user);
    }

    return user;
  } catch (error) {
    if (error.message === "User not found") {
      LOGGER.error("User not found");
      throw new Error("User not found");
    }

    LOGGER.error("Error fetching user by ID:", error);
    throw new Error(error);
  }
};

export const UPDATE_USER_BY_ID = async (id, data) => {
  try {
    const exisiting_user = GET_USER_BY_ID(id);

    if (data.email && data.email !== exisiting_user.email) {
      const [existing_user_with_email] = await DB.select()
        .from(USERS)
        .where(eq(USERS.email, data.email))
        .limit(1);
      if (existing_user_with_email) {
        throw new Error("User with this email already exists");
      }
    }

    return await DB.update()
      .set({
        name: data.name,
        email: data.email,
        role: data.role,
        password: data.password,
        updatedAt: new Date(),
      })
      .from(USERS)
      .where(eq(USERS.id, id));
  } catch (error) {
    if (error.message === "User with this email already exists") {
      LOGGER.error("User with this email already exists");
      throw new Error("User with this email already exists");
    }

    LOGGER.error("Error updating user by ID:", error);
    throw new Error(error);
  }
};

export const DELETE_USER_BY_ID = async (id) => {
  try {
    const user = await GET_USER_BY_ID(id);
    if (!user) {
      throw new Error("User not found");
    }

    return await DB.delete(USERS).where(eq(USERS.id, id));
  } catch (error) {
    if (error.message === "User not found") {
      LOGGER.error("User not found");
      throw new Error("User not found");
    }

    LOGGER.error("Error deleting user by ID:", error);
    throw error;
  }
};
