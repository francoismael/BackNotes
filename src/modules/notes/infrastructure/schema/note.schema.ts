import { Schema, Document } from "mongoose";

export const NoteSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String},
    userId: {type: String},
},
{collection: 'note'}
);

export interface NoteDocument extends Document {
    title: String;
    content: String;
    userId: String;
} 