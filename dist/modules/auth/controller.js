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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const error_1 = require("../../utils/error");
const response_1 = require("../../utils/response");
class AuthController {
    constructor(authUseCase) {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, name, password } = req.body;
                const user = yield this.authUseCase.registerUser({
                    email,
                    name,
                    password,
                });
                return res.status(201).json((0, response_1.successResponse)("User created", user));
            }
            catch (error) {
                if (error instanceof error_1.ApiErrorClass) {
                    return res.status(error.statusCode).json((0, response_1.errorResponse)(error.message));
                }
                console.error("Internal Error:", error);
                return res.status(500).json((0, response_1.errorResponse)("Internal Server Error"));
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.authUseCase.loginUser({
                    email,
                    password,
                });
                return res.status(200).json((0, response_1.successResponse)("Login success", user));
            }
            catch (error) {
                if (error instanceof error_1.ApiErrorClass) {
                    return res.status(error.statusCode).json((0, response_1.errorResponse)(error.message));
                }
                console.error("Internal Error:", error);
                return res.status(500).json((0, response_1.errorResponse)("Internal Server Error"));
            }
        });
        this.me = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user) {
                    throw new error_1.ApiErrorClass(false, 401, "Unauthorized");
                }
                const data = yield this.authUseCase.getUser(user.id);
                return res.status(200).json((0, response_1.successResponse)("User data", data));
            }
            catch (error) {
                if (error instanceof error_1.ApiErrorClass) {
                    return res.status(error.statusCode).json((0, response_1.errorResponse)(error.message));
                }
                console.error("Internal Error:", error);
                return res.status(500).json((0, response_1.errorResponse)("Internal Server Error"));
            }
        });
        this.authUseCase = authUseCase;
    }
}
exports.AuthController = AuthController;
