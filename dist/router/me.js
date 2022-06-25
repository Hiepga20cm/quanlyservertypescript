"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const MeController_1 = __importDefault(require("../app/controller/MeController"));
//router.get('/getall',ServerController.getAllServer);
router.get('/stored/server', MeController_1.default.storedServer);
router.get('/trash/server', MeController_1.default.trashServer);
exports.default = router;
//# sourceMappingURL=me.js.map