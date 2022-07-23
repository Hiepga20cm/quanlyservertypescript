import mongoose, { Document, Schema } from 'mongoose';

export interface user {
    userName: string;
    passWord: string;
    permission: string;
}
export interface userModel extends user, Document { }


const User: Schema = new Schema(
    {
        userName: { type: String, require: true },
        passWord: { type: String, minlength: 8, require: true },
        permission: { type: String, require: true },
        firstName: { type: String, require: true },
        lastName: { type: String, require: true }
    },
    { timestamps: true }
);


export default mongoose.model<userModel>('user1', User);
