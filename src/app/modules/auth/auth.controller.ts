import { Request, Response } from "express";
import catchAsync from "../../../shared/createAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await AuthService.createUser(userData);

  sendResponse<{ accessToken: string }>(res, {
    statusCode: 200,
    success: true,
    message: "Account created successfully !",
    data: result,
  });
});

export const AuthController = {
  createUser,
};
