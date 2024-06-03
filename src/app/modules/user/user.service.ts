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

// single user
const getSingleUser = async (
  userInfo: Partial<IUser>
): Promise<IUser | null> => {
  const user = await User.findOne({ email: userInfo.email });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  return user;
};

export const UserService = {
  getUsers,
  getSingleUser,
};
