import { Request, Response } from "express";
import Server from "../model/Entitys/Server";
import User from "../model/Entitys/User";
import jwt = require("jsonwebtoken");
import bcrypt from "bcrypt";


// [get] home
const home = async (req: Request, res: Response, next) => {

    try {
        const servers: any = await Server.find();
        res.status(200).json(servers);
    } catch (error) {
        res.status(404).json('not found');
    }

}

//[get]/search 
const search = async (req: Request, res: Response, next) => {
    try {
        const server = await Server.find({ name: { $regex: req.query.q } })
        console.log(server);

        if (server) {
            res.status(200).json(server);
        } else {
            res.status(404).json('not found');
        }

    } catch (error) {
        res.status(404).json('not found');
    }

    // console.log(req.query.q);

}

//[post]/login
const login = async (req: Request, res: Response) => {
    const { userName, passWord } = req.body;


    try {
        const user: any = await User.findOne({ userName: userName });
        //console.log(user);

        if (user) {
            const validity: boolean = await bcrypt.compare(passWord, user.passWord);
            if (!validity) {
                return res.json({ status: "wrong password" });
            } else {
                const token = jwt.sign(
                    {
                        _id: user._id,
                        permission: user.permission
                    },
                    "12345678",
                    {
                        expiresIn: 1000000,
                    }
                );

                return res.json({ status: 'ok', user: token, permission: user.permission });
            }
        } else {
            return res.json({ status: "user does not exists" });

        }
    } catch (error) {
        console.log(error);
        //res.status(500).json({ message: error.message });
    }

}


//[get]/logout
const logout = (req: Request, res: Response) => {

    //res.redirect('/login1');
}
export default {
    home,
    search,
    login,
    logout,
    //register

}