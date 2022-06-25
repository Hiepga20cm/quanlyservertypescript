"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const server_1 = __importDefault(require("./server"));
const me_1 = __importDefault(require("./me"));
const site_1 = __importDefault(require("./site"));
router.use('/server', server_1.default);
router.use('/me', me_1.default);
router.use('/', site_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map