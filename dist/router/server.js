"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const ServerController_1 = __importDefault(require("../app/controller/ServerController"));
router.post('/store', ServerController_1.default.store);
router.get('/create', ServerController_1.default.create);
router.get('/:id/edit', ServerController_1.default.edit);
router.patch('/:id', ServerController_1.default.update);
router.patch('/:id/restore', ServerController_1.default.restore);
router.patch('/delete/:id', ServerController_1.default.destroy);
router.delete('/:id/deleteindatabase', ServerController_1.default.deleteindatabase);
router.get('/:name', ServerController_1.default.show);
exports.default = router;
//# sourceMappingURL=server.js.map