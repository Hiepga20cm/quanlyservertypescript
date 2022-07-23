"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../model/Entitys/User"));
//const { default: jwtDecode } = require('jwt-decode');
const requireAuth = function (req, res, next) {
    try {
        const token1 = req.headers.authorization.split(" ")[1];
        //console.log(token1)
        if (!req.headers.authorization) {
            res.status(404);
            alert('vui lòng đăng nhập lại');
            return;
        }
        else {
            const token = jsonwebtoken_1.default.verify(token1, '12345678');
            //console.log(token);
            const user = User_1.default.findById(token._id);
            console.log(user);
            if (!user) {
                res.json({ status: '404', messege: 'bạn không đủ quyền' });
                return;
            }
            else {
                console.log('dang nhap thanh cong');
                next();
            }
        }
    }
    catch (error) {
    }
};
exports.default = {
    requireAuth
};
//# sourceMappingURL=auth.js.map