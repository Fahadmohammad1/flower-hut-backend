import { Request, Response } from "express";
import catchAsync from "../../../shared/createAsync";
import sendResponse from "../../../shared/sendResponse";
import { IProduct } from "./product.interface";
import { ProductService } from "./product.service";

const addProduct = catchAsync(async (req: Request, res: Response) => {
  const productData = req.body;
  const result = await ProductService.addProduct(productData);

  sendResponse<IProduct | null>(res, {
    statusCode: 200,
    success: true,
    message: "Product added successfully !",
    data: result,
  });
});

export const ProductController = {
  addProduct,
};
