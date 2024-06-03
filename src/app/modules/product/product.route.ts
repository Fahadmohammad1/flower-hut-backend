import express from "express";
import { ProductController } from "./product.controller";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/add",
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ProductController.addProduct
);

export const productRoutes = router;
