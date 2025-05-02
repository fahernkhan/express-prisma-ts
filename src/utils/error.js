"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrorClass = void 0;
class ApiErrorClass extends Error {
    constructor(status, statusCode, message) {
        super(message);
        this.status = status;
        this.statusCode = statusCode;
        this.name = "ApiError";
        // Set the prototype explicitly to maintain correct instanceof behavior
        Object.setPrototypeOf(this, ApiErrorClass.prototype);
    }
}
exports.ApiErrorClass = ApiErrorClass;
