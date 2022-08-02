import jwt from 'jsonwebtoken';
import User from '../model/Entitys/User';
import { Request, Response } from "express";

const requireAuthorization = function (req: Request, res: Response, next) {
    
    const token1 = req.headers.authorization.split(" ")[1];
    const token = <any>jwt.verify(token1, '12345678');
    //console.log(token);

    //const user = User.findById(token._id);
    console.log(token.permission);

    if (token.permission !== 'admin') {
        res.json({ status: 'bạn không đủ quyền' });
        return;
    }
    else {
        console.log('ban la admin');
        next();
    }
};
export default {
    requireAuthorization
}