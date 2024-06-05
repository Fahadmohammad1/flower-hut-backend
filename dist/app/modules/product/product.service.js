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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const product_model_1 = __importDefault(require("./product.model"));
const addProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield user_model_1.default.findOne({ email: productData.ownerEmail });
    if (!findUser) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User not found");
    }
    return yield product_model_1.default.create(productData);
});
// get all proudcts
const getAllProducts = (queries) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = queries, filterQuery = __rest(queries, ["search"]);
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
                            $gte: Number(value),
                        },
                    };
                }
                if (field === "maxPrice") {
                    return {
                        price: {
                            $lte: Number(value),
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
    return yield product_model_1.default.find(whereConditions);
});
// products added by a particular user
const getMyProducts = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.find({ ownerEmail: email });
});
// get single products
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.findOne({ id });
});
// update product
const updateProduct = (user, id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const findProduct = yield product_model_1.default.findOne({ id });
    if (user.role !== "admin" && (findProduct === null || findProduct === void 0 ? void 0 : findProduct.ownerEmail) !== user.email) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Forbidden Access");
    }
    return yield product_model_1.default.findByIdAndUpdate({ id }, updateData);
});
// delete product
const deleteProduct = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const findProduct = yield product_model_1.default.findOne({ id });
    if (user.role !== "admin" && (findProduct === null || findProduct === void 0 ? void 0 : findProduct.ownerEmail) !== user.email) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Forbidden Access");
    }
    return yield product_model_1.default.findOneAndDelete({ id });
});
exports.ProductService = {
    addProduct,
    getAllProducts,
    getSingleProduct,
    getMyProducts,
    updateProduct,
    deleteProduct,
};
