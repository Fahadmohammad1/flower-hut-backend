import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./user.interface";
import User from "./user.model";

const getUsers = async (userInfo: Partial<IUser>): Promise<IUser[] | null> => {
  if (userInfo.role !== "admin") {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidded Access");
  }
  const users = await User.find({});

  return users;
};

export const UserService = {
  getUsers,
};
