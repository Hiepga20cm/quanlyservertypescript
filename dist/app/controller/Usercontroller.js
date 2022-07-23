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
const User_1 = __importDefault(require("../model/Entitys/User"));
const jwt = require("jsonwebtoken");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getallUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({ permission: 'user' });
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
    }
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, passWord, firstName, lastName, permission } = req.body;
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPass = yield bcrypt_1.default.hash(passWord, salt);
    const newUser = new User_1.default({
        userName,
        passWord: hashedPass,
        firstName,
        lastName,
        permission
    });
    try {
        const oldUser = yield User_1.default.findOne({ userName });
        if (oldUser) {
            return res.status(400).json({ message: "username is allready registered!" });
        }
        const user = yield newUser.save();
        const token = jwt.sign({
            userName: user.userName, id: user._id
        }, "12345678", { expiresIn: '1h' });
        res.status(200).json({ user, token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const deleteUser = (req, res, next) => {
    try {
        User_1.default.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json('Xóa thành công tài khoản'))
            .catch(next);
    }
    catch (error) {
        console.log(error);
    }
};
const updateUser = (req, res, next) => {
    try {
        User_1.default.findById(req.params.id)
            .then(user => { user; })
            .catch(next);
    }
    catch (error) {
        console.log(error);
    }
};
//[patch]/server/:id
const update = (req, res, next) => {
    try {
        User_1.default.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.status(200).json('update thành công'))
            .catch(next);
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = {
    register,
    deleteUser,
    update,
    updateUser,
    getallUser
};
//# sourceMappingURL=Usercontroller.js.map