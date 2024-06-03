import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import User from "../user/user.model";
import { IProduct } from "./product.interface";
import Product from "./product.model";

const addProduct = async (productData: IProduct) => {
  const findUser = await User.findOne({ email: productData.ownerEmail });

  if (!findUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User not found");
  }

  return await Product.create(productData);
};

export const ProductService = {
  addProduct,
};
