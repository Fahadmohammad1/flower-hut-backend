import httpStatus from "http-status";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";

const createUser = async (user: IUser) => {
  const { email, role } = user;

  if (!user.password) {
    user.password = config.default_pass as string;
  }

  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user account");
  }

  const accessToken = jwtHelpers.createToken(
    { email, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { accessToken };
};

export const AuthService = {
  createUser,
};
