import { Note } from "../../domain/entities/note";

export interface NoteRepository {
  createNote(note: Note): Promise<Note>;
  findByIdAndUser(noteId: string, userId: string): Promise<Note | null>;
  updateNote(note: Note): Promise<Note>;
  deleteNote(noteId: string, userId: string): Promise<void>;
  findAllByUser(userId: string): Promise<Note[]>;
}
