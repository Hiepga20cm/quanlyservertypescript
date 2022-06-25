import mongoose, { Document, Schema } from 'mongoose';

export interface user {
    userName: string;
    passWord: string;
    permission: string;
}
export interface userModel extends user, Document { }


const User: Schema = new Schema(
    {
        userName: { type: String },
        passWord: { type: String, minlength: 8 },
        permission: { type: String }

    },
    { timestamps: true }
);


export default mongoose.model<userModel>('User1', User);
