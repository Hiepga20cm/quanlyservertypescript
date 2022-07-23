"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const Usercontroller_1 = __importDefault(require("../app/controller/Usercontroller"));
router.get('/getUsers', Usercontroller_1.default.getallUser);
router.post('/register', Usercontroller_1.default.register);
router.delete('/:id/deleteUser/', Usercontroller_1.default.deleteUser);
router.get('/:id/updateUser', Usercontroller_1.default.updateUser);
router.patch('/:id/update', Usercontroller_1.default.update);
exports.default = router;
//# sourceMappingURL=Userct.js.map