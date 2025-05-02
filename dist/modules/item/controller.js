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
exports.Controller = void 0;
class Controller {
    constructor(useCase) {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price } = req.body;
                const response = yield this.useCase.create({
                    name,
                    price,
                });
                res.status(201).json(response);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
        this.getItem = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.useCase.findAll();
                res.status(200).json(response);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
        this.updateItem = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const { name, price } = req.body;
                const response = yield this.useCase.updateById({
                    id,
                    name,
                    price,
                });
                res.status(200).json(response);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
        this.deleteItem = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const response = yield this.useCase.deleteById(id);
                res.status(200).json(response);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
        this.useCase = useCase;
    }
}
exports.Controller = Controller;
