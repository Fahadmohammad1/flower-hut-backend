import express from "express";
import { ProductController } from "./product.controller";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middleware/auth";

const router = express.Router();

router.get(
  "/all",
  // auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ProductController.getAllProducts
);

router.get(
  "/myProducts",
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ProductController.getMyProducts
);

router.get(
  "/:id",
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ProductController.getSingleProduct
);

router.post(
  "/add",
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ProductController.addProduct
);

router.patch(
  "/update",
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ProductController.updateProduct
);

router.delete(
  "/delete",
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ProductController.deleteProduct
);

export const productRoutes = router;
