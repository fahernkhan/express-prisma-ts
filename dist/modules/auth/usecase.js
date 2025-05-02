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
exports.AuthUseCase = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = require("../../utils/error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.hash(password, 10);
        });
    }
    comparePassword(password, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(password, hashedPassword);
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findUserByEmail(email);
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findUserById(id);
        });
    }
    registerUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.findUserByEmail(data.email);
            if (check) {
                throw new error_1.ApiErrorClass(false, 400, 'User already exists');
            }
            const hashedPassword = yield this.hashPassword(data.password);
            const repo = yield this.repository.createUser({
                email: data.email,
                name: data.name,
                password: hashedPassword,
            });
            const res = {
                email: repo.email,
                name: repo.name,
            };
            return res;
        });
    }
    loginUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUserByEmail(data.email);
            if (!user) {
                throw new error_1.ApiErrorClass(false, 404, 'User not found');
            }
            const match = yield this.comparePassword(data.password, user.password);
            if (!match) {
                throw new error_1.ApiErrorClass(false, 400, 'Invalid Password');
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET_KEY || 'secret', {
                expiresIn: '3d',
            });
            return {
                user: {
                    email: user.email,
                    name: user.name,
                },
                token,
            };
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUserById(id);
            if (!user) {
                throw new error_1.ApiErrorClass(false, 404, 'User not found');
            }
            const res = {
                email: user.email,
                name: user.name,
            };
            return res;
        });
    }
}
exports.AuthUseCase = AuthUseCase;
