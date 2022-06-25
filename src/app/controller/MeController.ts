import { Request, Response } from "express";
import Server from "../model/Entitys/Server";
import mongooes from "../../ultill/mongooes"

const storedServer = (req: Request, res: Response, next) => {
    Server.find({ deleted: false })
        .then(server => {
            res.render('me/stored-server', { server: mongooes.mutipleMongooseToObject(server) }),
                console.log(server)
        })
        .catch(next);

}
const trashServer = (req: Request, res: Response, next) => {
    Server.find({ deleted: true })
        .then(server => {
            res.render('me/trash-server', { server: mongooes.mutipleMongooseToObject(server) }), console.log(server)
        })
        .catch(next)
}
export default {
    storedServer,
    trashServer
}