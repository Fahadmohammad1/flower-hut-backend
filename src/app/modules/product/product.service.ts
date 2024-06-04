import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import User from "../user/user.model";
import { IProduct, IQueryies } from "./product.interface";
import Product from "./product.model";
import { JwtPayload } from "jsonwebtoken";

const addProduct = async (productData: IProduct) => {
  const findUser = await User.findOne({ email: productData.ownerEmail });

  if (!findUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User not found");
  }

  return await Product.create(productData);
};

// get all proudcts
const getAllProducts = async (
  queries: IQueryies
): Promise<IProduct[] | null> => {
  const { search, ...filterQuery } = queries;

  const query = [];

  if (search) {
    query.push({
      name: {
        $regex: search,
        $options: "i",
      },
    });
  }

  if (Object.keys(filterQuery).length) {
    query.push({
      $and: Object.entries(filterQuery).map(([field, value]) => {
        if (field === "minPrice") {
          return {
            price: {
              $gte: Number(value as string),
            },
          };
        }
        if (field === "maxPrice") {
          return {
            price: {
              $lte: Number(value as string),
            },
          };
        }
        return {
          [field]: value,
        };
      }),
    });
  }

  const whereConditions = query.length > 0 ? { $and: query } : {};

  return await Product.find(whereConditions);
};

// products added by a particular user
const getMyProducts = async (email: string): Promise<IProduct[] | null> => {
  return await Product.find({ ownerEmail: email });
};

// get single products
const getSingleProduct = async (id: string): Promise<IProduct | null> => {
  return await Product.findOne({ id });
};

// update product
const updateProduct = async (
  user: JwtPayload,
  id: string,
  updateData: Partial<IProduct>
) => {
  const findProduct = await Product.findOne({ id });

  if (user.role !== "admin" && findProduct?.ownerEmail !== user.email) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden Access");
  }

  return await Product.findByIdAndUpdate({ id }, updateData);
};

// delete product
const deleteProduct = async (
  user: JwtPayload,
  id: string
): Promise<IProduct | null> => {
  const findProduct = await Product.findOne({ id });

  if (user.role !== "admin" && findProduct?.ownerEmail !== user.email) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden Access");
  }

  return await Product.findOneAndDelete({ id });
};

export const ProductService = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
};
