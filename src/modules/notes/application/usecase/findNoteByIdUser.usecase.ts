import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { NoteRepositoryToken } from "../ports/note.repository.token";
import { NoteRepository } from "../ports/note.repository.interface";
import { Note } from "../../domain/entities/note";

@Injectable()
export class FindNoteByIdUser {
  constructor(
    @Inject(NoteRepositoryToken)
    private readonly noteRepository: NoteRepository,
  ) {}

  async execute(noteId: string, userId: string): Promise<Note> {
    const note = await this.noteRepository.findByIdAndUser(noteId, userId);

    if (!note) {
      throw new NotFoundException('Aucune note trouver pour cette utilisateur');
    }

    return note;
  }
}
