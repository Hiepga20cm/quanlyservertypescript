
import { Request, Response } from "express";
import Server from "../model/Entitys/Server";
import MongooseDelete from "mongoose-delete";
import mongooes from "../../ultill/mongooes";


const getAllServer = (req: Request, res: Response) => {
    //ServerService.getAllServer();
    res.render('home');
}
//[get]/show 
const show = (req: Request, res: Response, next) => {
    Server.findOne({ name: req.params.name }).lean()
        .then((server) => {
            console.log(server);
            return res.render('server/show', { server })
        })
        .catch(next);
}
// [get]/createServer
const create = (req: Request, res: Response, next) => {
    res.render('server/create');
}

// [post] /server/store
const store = (req: Request, res: Response, next) => {
    const formData = req.body;
    console.log(req.body);
    formData.image = `https://freepngimg.com/thumb/server/36301-1-server-hd.png`;
    const server = new Server(formData);// tạo ra một đối tượng kiểu Server và đưa  dữ liệu muốn ghi vào
    server.save()
        .then(() => res.redirect('/'))
        .catch(next);
    //res.json(req.body);
}
//[get]/server/:id/edit
const edit = (req: Request, res: Response, next) => {
    Server.findById(req.params.id)
        .then(server => res.render('server/edit', { server: mongooes.mongooseToObject(server) }))
        .catch(next);
}

//[patch]/server/:id
const update = (req: Request, res: Response, next) => {
    Server.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.redirect('/me/stored/server'))
        .catch(next);
}

//[patch]/server/:id
const destroy = (req: Request, res: Response, next) => {
    Server.updateOne({ _id: req.params.id }, { deleted: true })
        .then(() => res.redirect('back'))// quay trowr laji trang trước đó
        .catch(next);
}

//[patch]/server/:id/restore

const restore = (req: Request, res: Response, next) => {
    Server.updateOne({ _id: req.params.id }, { deleted: false })
        .then(() => res.redirect('back'))
        .catch(next);
}

//[delete]/server/:id/deleteindatabase
const deleteindatabase = (req: Request, res: Response, next) => {
    Server.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
}

export default {
    getAllServer,
    show,
    create,
    store,
    edit,
    update,
    destroy,
    restore,
    deleteindatabase
}