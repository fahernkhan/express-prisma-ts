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
exports.Repository = void 0;
class Repository {
    constructor(db) {
        this.db = db;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.item.create({
                data,
            });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.item.findMany({
                orderBy: {
                    id: "asc",
                },
            });
        });
    }
    updateById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.item.update({
                where: {
                    id,
                },
                data,
            });
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.item.delete({
                where: {
                    id,
                },
            });
        });
    }
}
exports.Repository = Repository;
