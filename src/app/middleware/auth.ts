import jwt from 'jsonwebtoken';
import User from '../model/Entitys/User';
import { Request, Response } from "express";


//const { default: jwtDecode } = require('jwt-decode');

const requireAuth = function (req: Request, res: Response, next) {
    try {
        const token1 = req.headers.authorization.split(" ")[1];
        //console.log(token1)
        if (!req.headers.authorization) {
            res.status(404);
            alert('vui lòng đăng nhập lại');
            return;
        } else {
            const token = <any>jwt.verify(token1, '12345678');
            //console.log(token);

            const user = User.findById(token._id)
            console.log(user)

            if (!user) {
                res.json({status:'404' , messege : 'bạn không đủ quyền'});
                return;
            } else {
                console.log('dang nhap thanh cong');
                next();
            }
        }
    } catch (error) {

    }
};

export default {
    requireAuth
}