"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("../model/Entitys/Server"));
const getAllServer = (req, res) => {
    //ServerService.getAllServer();
    res.render('home');
};
//[get]/show 
const show = (req, res, next) => {
    Server_1.default.findOne({ name: req.params.name }).lean()
        .then((server => { server; }))
        .catch(next);
};
// [get]/createServer
const create = (req, res, next) => {
    res.render('server/create');
};
// [post] /server/store
const store = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formData = req.body;
        const check = yield Server_1.default.find({ name: req.body.name }).exec();
        if (!check.length) {
            const server = new Server_1.default(formData); // tạo ra một đối tượng kiểu Server và đưa  dữ liệu muốn ghi vào
            server.save()
                .catch(next);
        }
        else {
            res.status(500).json('the name allready exists');
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json('error');
    }
});
//[get]/server/:id/edit
const edit = (req, res, next) => {
    Server_1.default.findById(req.params.id)
        .then(server => { server; })
        .catch(next);
};
//[patch]/server/:id
const update = (req, res, next) => {
    try {
        Server_1.default.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.status(200).json('update thành công'))
            .catch(next);
    }
    catch (error) {
        console.log(error);
    }
};
//[patch]/server/delete/:id
const destroy = (req, res, next) => {
    Server_1.default.updateOne({ _id: req.params.id }, { deleted: true })
        //.then(() => res.redirect('back'))// quay trowr laji trang trước đó
        .then(() => res.status(200).json('Đã chuyển đến thư mục thùng rác'))
        .catch(next);
};
//[patch]/server/:id/restore
const restore = (req, res, next) => {
    Server_1.default.updateOne({ _id: req.params.id }, { deleted: false })
        .then(() => res.status(200).json('khôi phục thành công'))
        //.then(() => res.redirect('back'))
        .catch(next);
};
//[delete]/server/:id/deleteindatabase
const deleteindatabase = (req, res, next) => {
    Server_1.default.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json('xóa thành công'))
        //  .then(() => res.redirect('back'))
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