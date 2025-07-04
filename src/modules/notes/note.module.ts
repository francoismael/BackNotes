import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/strategies/strategy.jwt';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NoteController } from './interfaces/note.controller';
import { MongoNoteRepository } from './infrastructure/repositories/MongoNote.repository';
import { NoteRepositoryToken } from './application/ports/note.repository.token';
import { FindNoteByIdUser } from './application/usecase/findNoteByIdUser.usecase';
import { CreateNote } from './application/usecase/createNote.usecase';
import { NoteSchema } from './infrastructure/schema/note.schema';
import { FindAllByUser } from './application/usecase/findAllByUser.usecase';
import { DeleteNote } from './application/usecase/deleteNote.usecase';
import { UpdateNotes } from './application/usecase/updateNote.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Note', schema: NoteSchema }]),
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [NoteController],
  providers: [
    {
      provide: NoteRepositoryToken,
      useClass: MongoNoteRepository,
    },
    CreateNote,
    FindNoteByIdUser,
    FindAllByUser,
    DeleteNote,
    UpdateNotes,
    JwtStrategy,    // 👈 STRATEGY pour décoder le token
    JwtAuthGuard,   // 👈 GUARD dispo pour le controller
  ],
})
export class NoteModule {}
