import { Request, Response } from "express";
import User from "../model/Entitys/User";
import jwt = require("jsonwebtoken");
import bcrypt from "bcrypt";

const getallUser = async (req: Request, res: Response, next) => {

    try {
        const users: any = await User.find({ permission: 'user' });
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }

}

const register = async (req: Request, res: Response) => {
    const { userName, passWord, firstName, lastName, permission } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(passWord, salt);
    const newUser = new User({
        userName,
        passWord: hashedPass,
        firstName,
        lastName,
        permission

    });
    try {
        const oldUser = await User.findOne({ userName })

        if (oldUser) {
            return res.status(400).json({ message: "username is allready registered!" });
        }

        const user = await newUser.save();

        const token = jwt.sign({
            userName: user.userName, id: user._id
        },
            "12345678",
            { expiresIn: '1h' }
        )
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}
const deleteUser = (req: Request, res: Response, next) => {
    try {
        User.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json('Xóa thành công tài khoản'))
            .catch(next);
    } catch (error) {
        console.log(error);
    }
}
const updateUser = (req: Request, res: Response, next) => {
    try {
        User.findById(req.params.id)
            .then(user => { user })
            .catch(next)
    } catch (error) {
        console.log(error);
    }
}
//[patch]/server/:id
const update = (req: Request, res: Response, next) => {
    try {
        User.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.status(200).json('update thành công'))
            .catch(next);
    } catch (error) {
        console.log(error);
    }

}
const search = async (req: Request, res: Response, next) => {
    try {
        const user = await User.find({ userName: { $regex: req.query.q }, permission: 'user' })
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json('not found');
        }
    } catch (error) {
        console.log(error);
    }
}

export default {
    register,
    deleteUser,
    update,
    updateUser,
    getallUser,
    search
}