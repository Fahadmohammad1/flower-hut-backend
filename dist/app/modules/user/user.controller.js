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
exports.UserController = void 0;
const createAsync_1 = __importDefault(require("../../../shared/createAsync"));
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const getUsers = (0, createAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role } = req.user;
    const result = yield user_service_1.UserService.getUsers({ email, role });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Users fetched successfully !",
        data: result,
    });
}));
const getSingleUser = (0, createAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const result = yield user_service_1.UserService.getSingleUser({ email });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User fetched successfully !",
        data: result,
    });
}));
const updateUser = (0, createAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const data = req.body;
    const result = yield user_service_1.UserService.updateUser(email, data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User updated successfully !",
        data: result,
    });
}));
exports.UserController = {
    getUsers,
    getSingleUser,
    updateUser,
};
