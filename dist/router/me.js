"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const MeController_1 = __importDefault(require("../app/controller/MeController"));
const authorization_1 = __importDefault(require("../app/middleware/authorization"));
const auth_1 = __importDefault(require("../app/middleware/auth"));
//router.get('/getall',ServerController.getAllServer);
router.get('/stored/server', auth_1.default.requireAuth, MeController_1.default.storedServer);
router.get('/trash/server', authorization_1.default.requireAuthorization, MeController_1.default.trashServer);
router.get('/searchTrash', authorization_1.default.requireAuthorization, MeController_1.default.searchTrash);
exports.default = router;
//# sourceMappingURL=me.js.map