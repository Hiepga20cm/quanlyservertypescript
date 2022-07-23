"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireAuthorization = function (req, res, next) {
    const token1 = req.headers.authorization.split(" ")[1];
    const token = jsonwebtoken_1.default.verify(token1, '12345678');
    //console.log(token);
    //const user = User.findById(token._id);
    console.log(token.permission);
    if (token.permission !== 'admin') {
        res.json({ status: 'bạn không đủ quyền' });
        return;
    }
    else {
        console.log('ban la admin');
        next();
    }
};
exports.default = {
    requireAuthorization
};
//# sourceMappingURL=authorization.js.map