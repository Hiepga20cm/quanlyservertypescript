import express from 'express';
import router from "./router";
import mongoose from 'mongoose';
//import handlebars from 'express-handlebars';
//import { engine } from 'express-handlebars';
//import path from 'path'
//import morgan from 'morgan'
import cookieParser = require("cookie-parser");
import methodOverride = require('method-override')//
//const mongoose_delete = require('mongoose-delete');
import cors from 'cors';
import bodyParser from "body-parser";

mongoose.connect('mongodb://localhost:27017/Serverts');

const app = express();
const port = 5000;
app.use(cors());
app.use(methodOverride('_method'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())

//app.engine('handlebars', engine());
//app.set('view engine', 'handlebars');
//app.set('views', './src/resources/views');
//console.log(__dirname);
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

app.use('/', router);

