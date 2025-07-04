import { Inject, Injectable } from "@nestjs/common";
import { NoteRepositoryToken } from "../ports/note.repository.token";
import { NoteRepository } from "../ports/note.repository.interface";
import { Note } from "../../domain/entities/note";

@Injectable()
export class UpdateNotes {
    constructor(
        @Inject(NoteRepositoryToken)
        private readonly noteRepository: NoteRepository,
    ){}

    async execute(noteId: String, userId: String, title: String, content: String): Promise<Note>{
        const note = new Note(noteId, title, content, userId);
        return this.noteRepository.updateNote(note);
    }
}