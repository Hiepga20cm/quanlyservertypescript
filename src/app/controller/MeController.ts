import { Request, Response } from "express";
import Server from "../model/Entitys/Server";

const storedServer = async (req: Request, res: Response, next) => {
    try {
        const servers: any = await Server.find({ deleted: false })
        res.status(200).json(servers);
    } catch (err) {
        console.log(err);
    }
}

const trashServer = async (req: Request, res: Response, next) => {
    try {
        const data: any = await Server.find({ deleted: true }).exec();
        if (!data) return res.status(404).json('No data')
        res.status(200).json(data);
    } catch (err) {
        return res.status(400).json(err)
    }
}
const searchTrash = async (req: Request, res: Response) => {
    try {
        try {
            const server = await Server.find({ name: { $regex: req.query.q }, deleted: true })
            if (server) {
                res.status(200).json(server);
            } else {
                res.status(404).json('not found');
            }

        } catch (error) {
            res.status(404).json('not found');
        }

    } catch (error) {

    }
}
export default {
    storedServer,
    trashServer,
    searchTrash
}