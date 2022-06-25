"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("../model/Entitys/Server"));
const User_1 = __importDefault(require("../model/Entitys/User"));
const jwt = require("jsonwebtoken");
const mongooes_1 = __importDefault(require("../../ultill/mongooes"));
// [get] home
const home = (req, res, next) => {
    Server_1.default.find({})
        .then(server => res.render('home', { server: mongooes_1.default.mutipleMongooseToObject(server) }))
        .catch(next);
};
//[get]/search 
const search = (req, res, next) => {
    const { name } = req.query;
    Server_1.default.find({ name: name }) // name dau la name trong model
        .then(server => res.render('search', { server: mongooes_1.default.mutipleMongooseToObject(server) }))
        .catch(next);
};
//[get] /login1
const login1 = (req, res, next) => {
    res.render('login');
};
//[post]/login
const login = (req, res, next) => {
    User_1.default.findOne({
        userName: req.body.userName,
        passWord: req.body.passWord
    }, (err, user) => {
        if (err) {
            res.status(404).json(err);
        }
        else {
            const token = jwt.sign({
                _id: user._id,
                permission: user.permission
            }, "12345678", {
                expiresIn: 1000,
            });
            res.cookie('token', token);
            res.redirect('/');
        }
    });
};
//[get]/logout
const logout = (req, res, next) => {
    res.clearCookie('token');
    console.log("cookie cleared");
    res.redirect('/login');
};
exports.default = {
    home,
    search,
    login1,
    login,
    logout
};
//# sourceMappingURL=SiteController.js.map