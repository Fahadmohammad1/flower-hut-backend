"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const createAsync_1 = __importDefault(require("../../../shared/createAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const product_service_1 = require("./product.service");
const addProduct = (0, createAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = req.body;
    const result = yield product_service_1.ProductService.addProduct(productData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Products added successfully !",
        data: result,
    });
}));
// get all products
const getAllProducts = (0, createAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield product_service_1.ProductService.getAllProducts(query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Products fetched successfully !",
        data: result,
    });
}));
// get the products of a particular user
const getMyProducts = (0, createAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const result = yield product_service_1.ProductService.getMyProducts(email);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Products fetched successfully !",
        data: result,
    });
}));
// get single product
const getSingleProduct = (0, createAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield product_service_1.ProductService.getSingleProduct(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Product fetched successfully !",
        data: result,
    });
}));
const updateProduct = (0, createAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const { id } = req.params;
    const productData = req.body;
    const result = yield product_service_1.ProductService.updateProduct(email, id, productData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Product updated successfully !",
        data: result,
    });
}));
const deleteProduct = (0, createAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { id } = req.params;
    const result = yield product_service_1.ProductService.deleteProduct(user, id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Product deleted successfully !",
        data: result,
    });
}));
exports.ProductController = {
    addProduct,
    getAllProducts,
    getSingleProduct,
    getMyProducts,
    updateProduct,
    deleteProduct,
};
