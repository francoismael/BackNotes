import { FindAllByUser } from './../../application/usecase/findAllByUser.usecase';
import { Injectable, NotFoundException } from "@nestjs/common";
import { NoteRepository } from "../../application/ports/note.repository.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NoteDocument } from "../schema/note.schema";
import { Note } from "../../domain/entities/note";

@Injectable()
export class MongoNoteRepository implements NoteRepository {
    constructor(
        @InjectModel('Note') private readonly noteModel: Model<NoteDocument>
    ){}

    async createNote(note: Note): Promise<Note> {
        const createdNote = new this.noteModel({
            title: note.title,
            content: note.content,
            userId: note.userId,
        })
        const result = await createdNote.save();
        return new Note(result.id.toString(), result.title, result.content, result.userId);
    }

    async findByIdAndUser(noteId: string, userId: string): Promise<Note | null> {
        const result = await this.noteModel.findOne({
          _id: noteId,
          userId: userId,
        }).exec();
      
        if (!result) return null;
      
        return new Note(
          result.id.toString(),
          result.title,
          result.content,
          result.userId,
        );
      }


      async updateNote(note: Note): Promise<Note> {
        const updated = await this.noteModel.findOneAndUpdate(
            {_id: note.id, userId: note.userId},
            {title: note.title, content: note.content},
            {new: true},
        ).exec();

        if(!updated){
          throw new NotFoundException('Note non trouver ou non autoriser');
        }

        return new Note(updated.id.toString(), updated.title, updated.content, updated.userId);
      }


      async deleteNote(noteId: string, userId: string): Promise<void> {
        const deleted = await this.noteModel.deleteOne({
          _id: noteId,
          userId: userId,
        }).exec();
      
        if (deleted.deletedCount === 0) {
          throw new NotFoundException('Note non trouvée ou non autorisée.');
        }
      }


      async findAllByUser(userId: string): Promise<Note[]> {
        const notes = await this.noteModel.find({ userId: userId }).exec();
        return notes.map(
          (n) => new Note(n.id.toString(), n.title, n.content, n.userId)
        );
      }
      
      
      async searchNotesByUser(userId: string, keyword: string): Promise<Note[]> {
          const regex = new RegExp(keyword, 'i');
          const notes = await this.noteModel.find({
            userId,
            $or: [
              {title: {$regex : regex}},
              {content: {$regex: regex}},
            ],
          }).exec();

          return notes.map(n => new Note(n.id.toString(), n.title, n.content, n.userId))
      }
}