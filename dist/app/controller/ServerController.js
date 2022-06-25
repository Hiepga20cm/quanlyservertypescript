"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("../model/Entitys/Server"));
const mongooes_1 = __importDefault(require("../../ultill/mongooes"));
const getAllServer = (req, res) => {
    //ServerService.getAllServer();
    res.render('home');
};
//[get]/show 
const show = (req, res, next) => {
    Server_1.default.findOne({ name: req.params.name }).lean()
        .then((server) => {
        console.log(server);
        return res.render('server/show', { server });
    })
        .catch(next);
};
// [get]/createServer
const create = (req, res, next) => {
    res.render('server/create');
};
// [post] /server/store
const store = (req, res, next) => {
    const formData = req.body;
    console.log(req.body);
    formData.image = `https://freepngimg.com/thumb/server/36301-1-server-hd.png`;
    const server = new Server_1.default(formData); // tạo ra một đối tượng kiểu Server và đưa  dữ liệu muốn ghi vào
    server.save()
        .then(() => res.redirect('/'))
        .catch(next);
    //res.json(req.body);
};
//[get]/server/:id/edit
const edit = (req, res, next) => {
    Server_1.default.findById(req.params.id)
        .then(server => res.render('server/edit', { server: mongooes_1.default.mongooseToObject(server) }))
        .catch(next);
};
//[patch]/server/:id
const update = (req, res, next) => {
    Server_1.default.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.redirect('/me/stored/server'))
        .catch(next);
};
//[patch]/server/:id
const destroy = (req, res, next) => {
    Server_1.default.updateOne({ _id: req.params.id }, { deleted: true })
        .then(() => res.redirect('back')) // quay trowr laji trang trước đó
        .catch(next);
};
//[patch]/server/:id/restore
const restore = (req, res, next) => {
    Server_1.default.updateOne({ _id: req.params.id }, { deleted: false })
        .then(() => res.redirect('back'))
        .catch(next);
};
//[delete]/server/:id/deleteindatabase
const deleteindatabase = (req, res, next) => {
    Server_1.default.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
};
exports.default = {
    getAllServer,
    show,
    create,
    store,
    edit,
    update,
    destroy,
    restore,
    deleteindatabase
};
//# sourceMappingURL=ServerController.js.map