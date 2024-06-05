"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const product_route_1 = require("../modules/product/product.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.authRoutes,
    },
    {
        path: "/user",
        route: user_route_1.userRoutes,
    },
    {
        path: "/product",
        route: product_route_1.productRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
