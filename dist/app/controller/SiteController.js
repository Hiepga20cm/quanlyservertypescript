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
const User_1 = __importDefault(require("../model/Entitys/User"));
const jwt = require("jsonwebtoken");
const bcrypt_1 = __importDefault(require("bcrypt"));
// [get] home
const home = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const servers = yield Server_1.default.find();
        res.status(200).json(servers);
    }
    catch (error) {
        res.status(404).json('not found');
    }
});
//[get]/search 
const search = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const server = yield Server_1.default.find({ name: name });
        res.status(200).json(server);
    }
    catch (error) {
        res.status(404).json('not found');
    }
});
// const register = async (req: Request, res: Response) => {
//     const { userName, passWord, firstName, lastName, permission } = req.body;
//     const salt = await bcrypt.genSalt(10);
//     const hashedPass = await bcrypt.hash(passWord, salt);
//     const newUser = new User({
//         userName,
//         passWord: hashedPass,
//         firstName,
//         lastName,
//         permission
//     });
//     try {
//         const oldUser = await User.findOne({ userName })
//         if (oldUser) {
//             return res.status(400).json({ message: "username is allready registered!" });
//         }
//         const user = await newUser.save();
//         const token = jwt.sign({
//             userName: user.userName, id: user._id
//         },
//             "12345678",
//             { expiresIn: '1h' }
//         )
//         res.status(200).json({ user, token });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
//[post]/login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, passWord } = req.body;
    try {
        const user = yield User_1.default.findOne({ userName: userName });
        //console.log(user);
        if (user) {
            const validity = yield bcrypt_1.default.compare(passWord, user.passWord);
            if (!validity) {
                return res.json({ status: "wrong password" });
            }
            else {
                const token = jwt.sign({
                    _id: user._id,
                    permission: user.permission
                }, "12345678", {
                    expiresIn: 1000000,
                });
                return res.json({ status: 'ok', user: token, permission: user.permission });
            }
        }
        else {
            return res.json({ status: "user does not exists" });
        }
    }
    catch (error) {
        console.log(error);
        //res.status(500).json({ message: error.message });
    }
});
//[get]/logout
const logout = (req, res) => {
    //res.redirect('/login1');
};
exports.default = {
    home,
    search,
    login,
    logout,
    //register
};
//# sourceMappingURL=SiteController.js.map