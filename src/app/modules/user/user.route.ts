import express from "express";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { UserController } from "./user.controller";

const router = express.Router();

router.get("/", auth(ENUM_USER_ROLE.ADMIN), UserController.getUsers);

export const userRoutes = router;
