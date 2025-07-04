import { Inject, Injectable } from "@nestjs/common";
import { NoteRepositoryToken } from "../ports/note.repository.token";
import { NoteRepository } from "../ports/note.repository.interface";

@Injectable()
export class DeleteNote {
    constructor(
        @Inject(NoteRepositoryToken)
        private readonly noteRepository: NoteRepository,
    ){}

    async execute(userId: string, noteId: string): Promise<void>{
        return this.noteRepository.deleteNote(userId, noteId);
    }
}