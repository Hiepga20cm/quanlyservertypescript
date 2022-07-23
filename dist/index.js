"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const mongoose_1 = __importDefault(require("mongoose"));
//import handlebars from 'express-handlebars';
//import { engine } from 'express-handlebars';
//import path from 'path'
//import morgan from 'morgan'
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override"); //
//const mongoose_delete = require('mongoose-delete');
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
mongoose_1.default.connect('mongodb://localhost:27017/Serverts');
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)());
app.use(methodOverride('_method'));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(cookieParser());
//app.engine('handlebars', engine());
//app.set('view engine', 'handlebars');
//app.set('views', './src/resources/views');
//console.log(__dirname);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
app.use('/', router_1.default);
//# sourceMappingURL=index.js.map