import mongoose, { Document, Schema } from 'mongoose';
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete');
import { SoftDeleteDocument, SoftDeleteModel } from 'mongoose-delete';

mongoose.plugin(slug);

export interface server {
    name: string;
    password: string;
    status: boolean;
    ram: string;
    disk: string;

}



export interface serverModel extends server, Document { }


const Server: Schema = new Schema(
    {
        name: { type: String },
        password: { type: String, minlength: 8 },
        status: { type: Boolean },
        ram: { type: String },
        disk: { type: String },
        deleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);
// Server.plugin(mongooseDelete, {
//     deleteAt: true,
//     overrideMethods: 'all'
// });

export default mongoose.model<serverModel>('Server1', Server);
