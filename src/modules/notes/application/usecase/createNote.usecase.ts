import { Inject, Injectable } from "@nestjs/common";
import { NoteRepositoryToken } from "../ports/note.repository.token";
import { NoteRepository } from "../ports/note.repository.interface";
import { Note } from "../../domain/entities/note";

@Injectable()
export class CreateNote {
    constructor(
        @Inject(NoteRepositoryToken)
        private readonly noteRepository: NoteRepository,
    ){}

    async execute(title: String, content: String, userId: String): Promise<Note>{
        const newNote = new Note('', title, content, userId);
        return this.noteRepository.createNote(newNote);
    }
}