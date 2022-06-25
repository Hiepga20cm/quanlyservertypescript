import { Request, Response } from "express";
import Server from "../model/Entitys/Server";
import User from "../model/Entitys/User";
import jwt = require("jsonwebtoken");
import mongooes from "../../ultill/mongooes"
//import mutipleMongooseToObject from '../../ultill/mongooes'
import cookieParser = require("cookie-parser");
// [get] home
const home = (req: Request, res: Response, next) => {
    Server.find({})
        .then(server => res.render('home', { server: mongooes.mutipleMongooseToObject(server) }))
        .catch(next);
}

//[get]/search 
const search = (req: Request, res: Response, next) => {
    const { name } = req.query;
    Server.find({ name: name })// name dau la name trong model
        .then(server => res.render('search', { server : mongooes.mutipleMongooseToObject(server) }))
        .catch(next);
}
//[get] /login1
const login1 = (req: Request, res: Response, next) => {
    res.render('login');
}
//[post]/login
const login = (req: Request, res: Response, next) => {
    User.findOne({
        userName: req.body.userName,
        passWord: req.body.passWord
    }, (err, user) => {
        if (err) {
            res.status(404).json(err)
        } else {
            const token = jwt.sign(
                {
                    _id: user._id,
                    permission: user.permission
                },
                "12345678",
                {
                    expiresIn: 1000,
                }
            );
            res.cookie('token', token);
            res.redirect('/');
        }
    })
}

//[get]/logout
const logout = (req: Request, res: Response, next) => {
    res.clearCookie('token');
    console.log("cookie cleared");
    res.redirect('/login');
}
export default {
    home,
    search,
    login1,
    login,
    logout

}