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
        const { name } = req.params;
        const server = await Server.find({ name: name })
        res.status(200).json(server);
    } catch (error) {
        res.status(404).json('not found');
    }

}

// const register = async (req: Request, res: Response) => {
//     const { userName, passWord, firstName, lastName, permission } = req.body;
//     const salt = await bcrypt.genSalt(10);
//     const hashedPass = await bcrypt.hash(passWord, salt);
//     const newUser = new User({
//         userName,
//         passWord: hashedPass,
//         firstName,
//         lastName,
//         permission

//     });
//     try {
//         const oldUser = await User.findOne({ userName })

//         if (oldUser) {
//             return res.status(400).json({ message: "username is allready registered!" });
//         }

//         const user = await newUser.save();

//         const token = jwt.sign({
//             userName: user.userName, id: user._id
//         },
//             "12345678",
//             { expiresIn: '1h' }
//         )
//         res.status(200).json({ user, token });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }

// }



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