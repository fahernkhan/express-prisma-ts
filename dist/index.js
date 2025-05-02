"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./modules/auth/routes"));
const routes_2 = __importDefault(require("./modules/item/routes"));
const dotenv_1 = __importDefault(require("dotenv"));
// read env
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.APP_PORT || 3000;
app.use(express_1.default.json());
app.use(`/api/v1/auth`, routes_1.default);
app.use(`/api/v1/item`, routes_2.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
