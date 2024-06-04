import { Request, Response } from "express";
import catchAsync from "../../../shared/createAsync";
import sendResponse from "../../../shared/sendResponse";
import { IProduct, IQueryies } from "./product.interface";
import { ProductService } from "./product.service";
import { JwtPayload } from "jsonwebtoken";

const addProduct = catchAsync(async (req: Request, res: Response) => {
  const productData = req.body;
  const result = await ProductService.addProduct(productData);

  sendResponse<IProduct | null>(res, {
    statusCode: 200,
    success: true,
    message: "Products added successfully !",
    data: result,
  });
});

// get all products
const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const query = req.query as IQueryies;
  const result = await ProductService.getAllProducts(query);

  sendResponse<IProduct[] | null>(res, {
    statusCode: 200,
    success: true,
    message: "Products fetched successfully !",
    data: result,
  });
});

// get the products of a particular user
const getMyProducts = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user as JwtPayload;
  const result = await ProductService.getMyProducts(email);

  sendResponse<IProduct[] | null>(res, {
    statusCode: 200,
    success: true,
    message: "Products fetched successfully !",
    data: result,
  });
});

// get single product
const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductService.getSingleProduct(id);

  sendResponse<IProduct | null>(res, {
    statusCode: 200,
    success: true,
    message: "Product fetched successfully !",
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user as JwtPayload;
  const { id } = req.params;
  const productData = req.body;
  const result = await ProductService.updateProduct(email, id, productData);

  sendResponse<IProduct | null>(res, {
    statusCode: 200,
    success: true,
    message: "Product updated successfully !",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const { id } = req.params;
  const result = await ProductService.deleteProduct(user, id);

  sendResponse<IProduct | null>(res, {
    statusCode: 200,
    success: true,
    message: "Product deleted successfully !",
    data: result,
  });
});

export const ProductController = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
};
