import { userSchema } from './../../../auth/infrastructure/schema/user.schema';
import { Inject, Injectable } from "@nestjs/common";
import { NoteRepositoryToken } from "../ports/note.repository.token";
import { NoteRepository } from "../ports/note.repository.interface";
import { Note } from '../../domain/entities/note';

@Injectable()
export class SearchNotesByUser {
    constructor(
        @Inject(NoteRepositoryToken)
        private readonly noteRepository: NoteRepository){}


    async execute(userId: string, keyword: string): Promise<Note[]>{
        return this.noteRepository.searchNotesByUser(userId, keyword);
    }
}
