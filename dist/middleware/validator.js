"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const response_1 = require("../utils/response");
const validate = (options) => (req, res, next) => {
    try {
        if (options.body) {
            req.body = options.body.parse(req.body);
        }
        if (options.params) {
            req.params = options.params.parse(req.params);
        }
        if (options.query) {
            req.query = options.query.parse(req.query);
        }
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const messages = error.errors.map(err => `${err.path.join('.')} ${err.message.toLowerCase()}`);
            const message = `Validation error: ${messages.join(', ')}`;
            return res.status(400).json((0, response_1.errorResponse)(message));
        }
        next(error);
    }
};
exports.validate = validate;
