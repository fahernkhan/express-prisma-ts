"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = require("../utils/response");
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json((0, response_1.errorResponse)("Invalid token"));
    }
    try {
        const [_, tokenValue] = token.split(" ");
        const user = jsonwebtoken_1.default.verify(tokenValue, process.env.SECRET_KEY || "secret");
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json((0, response_1.errorResponse)("Invalid token"));
    }
};
exports.verifyToken = verifyToken;
