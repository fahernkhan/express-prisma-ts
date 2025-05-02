"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserSchema = exports.RegisterUserSchema = void 0;
// src/dto/registerUser.dto.ts
const zod_1 = require("zod");
exports.RegisterUserSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    name: zod_1.z.string().min(3, "must be at least 3 characters long"),
    password: zod_1.z.string().min(6, "must be at least 6 characters long"),
});
exports.LoginUserSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
});
