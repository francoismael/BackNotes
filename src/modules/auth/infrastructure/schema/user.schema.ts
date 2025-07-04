import { Schema, Document } from 'mongoose';

export const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
},
    {collection: 'user'}
);

export interface UserDocument extends Document {
    username: string,
    email: string,
    password: string,
}