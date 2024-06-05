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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
// register
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role } = user;
    if (!user.password) {
        user.password = config_1.default.default_pass;
    }
    const createdUser = yield user_model_1.default.create(user);
    if (!createdUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create user account");
    }
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ email, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return { accessToken };
});
// login
const loginUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = user;
    const isUserExist = yield user_model_1.default.findOne({ email });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    if (isUserExist.password && !(isUserExist.password === password)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Incorrect password");
    }
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ email, role: isUserExist.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return { accessToken };
});
exports.AuthService = {
    createUser,
    loginUser,
};
