"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (message, data) => {
    return {
        success: true,
        message,
        data,
    };
};
exports.successResponse = successResponse;
const errorResponse = (message, data) => {
    return {
        success: false,
        message,
        data,
    };
};
exports.errorResponse = errorResponse;
