"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const SiteController_1 = __importDefault(require("../app/controller/SiteController"));
//router.get('/logout', SiteController.logout);
router.get('/', SiteController_1.default.home);
router.get('/search', SiteController_1.default.search);
router.post('/login', SiteController_1.default.login);
router.get('/login1', SiteController_1.default.login1);
exports.default = router;
//# sourceMappingURL=site.js.map