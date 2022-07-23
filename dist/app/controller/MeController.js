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
const Server_1 = __importDefault(require("../model/Entitys/Server"));
const storedServer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const servers = yield Server_1.default.find({ deleted: false });
        res.status(200).json(servers);
    }
    catch (err) {
        console.log(err);
    }
});
const trashServer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Server_1.default.find({ deleted: true }).exec();
        if (!data)
            return res.status(404).json('No data');
        res.status(200).json(data);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.default = {
    storedServer,
    trashServer
};
//# sourceMappingURL=MeController.js.map