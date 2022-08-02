
import { Request, Response } from "express";
import Server from "../model/Entitys/Server";

const getAllServer = (req: Request, res: Response) => {
    //ServerService.getAllServer();
    res.render('home');
}
//[get]/show 
const showDetail = async (req: Request, res: Response) => {
    try {
        const detail: any = await Server.findById(req.params.id).lean();
        if (detail) {
            console.log(detail);
            res.status(200).json(detail);
        } else {
            res.status(200).json('not found');
        }
    } catch (error) {
        console.log(error);
    }

}

// [post] /server/store
const store = async (req: Request, res: Response, next) => {
    try {
        const formData: object = req.body;
        const check = await Server.find({ name: req.body.name }).exec();
        if (!check.length) {
            const server = new Server(formData);// tạo ra một đối tượng kiểu Server và đưa  dữ liệu muốn ghi vào
            server.save()
                .catch(next);
            res.status(200).json('success');
        } else {
            res.status(500).json('the name allready exists');
        }
    } catch (error) {
        console.log(error);
        res.status(404).json('error')
    }

}
//[get]/server/:id/edit
const edit = (req: Request, res: Response, next) => {
    Server.findById(req.params.id)
        .then(server => { server })
        .catch(next);
}

//[patch]/server/:id
const update = (req: Request, res: Response, next) => {
    try {
        Server.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.status(200).json('update thành công'))
            .catch(next);
    } catch (error) {
        console.log(error);
    }

}

//[patch]/server/delete/:id
const destroy = (req: Request, res: Response, next) => {
    Server.updateOne({ _id: req.params.id }, { deleted: true })
        //.then(() => res.redirect('back'))// quay trowr laji trang trước đó
        .then(() => res.status(200).json('Đã chuyển đến thư mục thùng rác'))
        .catch(next);
}

//[patch]/server/:id/restore

const restore = (req: Request, res: Response, next) => {
    Server.updateOne({ _id: req.params.id }, { deleted: false })
        .then(() => res.status(200).json('khôi phục thành công'))
        //.then(() => res.redirect('back'))
        .catch(next);
}

//[delete]/server/:id/deleteindatabase
const deleteindatabase = (req: Request, res: Response, next) => {
    Server.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json('xóa thành công'))
        //  .then(() => res.redirect('back'))
        .catch(next);
}

export default {
    getAllServer,
    showDetail,
    store,
    edit,
    update,
    destroy,
    restore,
    deleteindatabase
}