"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const ServerController_1 = __importDefault(require("../app/controller/ServerController"));
const authorization_1 = __importDefault(require("../app/middleware/authorization"));
router.post('/store', ServerController_1.default.store);
router.get('/create', ServerController_1.default.create);
router.get('/:id/edit', authorization_1.default.requireAuthorization, ServerController_1.default.edit);
router.patch('/:id', authorization_1.default.requireAuthorization, ServerController_1.default.update);
router.patch('/:id/restore', authorization_1.default.requireAuthorization, ServerController_1.default.restore);
router.patch('/delete/:id', ServerController_1.default.destroy);
router.delete('/:id/deleteindatabase', authorization_1.default.requireAuthorization, ServerController_1.default.deleteindatabase);
router.get('/:name', ServerController_1.default.show);
exports.default = router;
//# sourceMappingURL=server.js.map