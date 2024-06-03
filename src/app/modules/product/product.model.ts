import mongoose, { Schema } from "mongoose";
import { IProduct, sizes } from "./product.interface";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    prices: [
      {
        price: {
          type: Number,
          required: true,
        },
        size: {
          type: String,
          enum: [sizes],
          required: true,
        },
      },
    ],
    description: {
      type: String,
      required: true,
    },
    ownerEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
