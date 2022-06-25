"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("../model/Entitys/Server"));
const mongooes_1 = __importDefault(require("../../ultill/mongooes"));
const storedServer = (req, res, next) => {
    Server_1.default.find({ deleted: false })
        .then(server => {
        res.render('me/stored-server', { server: mongooes_1.default.mutipleMongooseToObject(server) }),
            console.log(server);
    })
        .catch(next);
};
const trashServer = (req, res, next) => {
    Server_1.default.find({ deleted: true })
        .then(server => {
        res.render('me/trash-server', { server: mongooes_1.default.mutipleMongooseToObject(server) }), console.log(server);
    })
        .catch(next);
};
exports.default = {
    storedServer,
    trashServer
};
//# sourceMappingURL=MeController.js.map