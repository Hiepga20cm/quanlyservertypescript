"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const SiteController_1 = __importDefault(require("../app/controller/SiteController"));
const auth_1 = __importDefault(require("../app/middleware/auth"));
router.get('/logout', auth_1.default.requireAuth, SiteController_1.default.logout);
router.get('/', auth_1.default.requireAuth, SiteController_1.default.home);
router.get('/search', auth_1.default.requireAuth, SiteController_1.default.search);
router.post('/login', SiteController_1.default.login);
exports.default = router;
//# sourceMappingURL=site.js.map