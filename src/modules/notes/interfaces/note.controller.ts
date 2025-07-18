
import { SearchNotesByUser } from './../application/usecase/searchNotesByUser.usecase';
/* eslint-disable prettier/prettier */
import {Body, Controller, Get, Post, Param, Request, UseGuards, Delete, Patch, Query,} from '@nestjs/common';
import { FindNoteByIdUser } from '../application/usecase/findNoteByIdUser.usecase';
import { CreateNote } from '../application/usecase/createNote.usecase';
import { CreateNoteDto } from './dto/createNote.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'; 

import { UpdateNotes } from '../application/usecase/updateNote.usecase';
import { DeleteNote } from '../application/usecase/deleteNote.usecase';
import { FindAllByUser } from '../application/usecase/findAllByUser.usecase';
  
  @Controller('notes')
  export class NoteController {
    constructor(
      private readonly createNoteUsecase: CreateNote,
      private readonly findNoteUsecase: FindNoteByIdUser,
      private readonly updateNoteUsecase: UpdateNotes,
      private readonly deleteNoteUsecase: DeleteNote,
      private readonly findAllByUser: FindAllByUser,
      private readonly SearchNotesByUserUsecase: SearchNotesByUser,
    ) {}
  

    
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Request() req, @Body() dto: CreateNoteDto) {
      return this.createNoteUsecase.execute(
        dto.title,
        dto.content ?? '',
        req.user.userId,
      );
    }


    @UseGuards(JwtAuthGuard)
    @Get('search')
    async Search(@Request() req, @Query('term') keyword: string) {
    return this.SearchNotesByUserUsecase.execute(req.user.userId, keyword);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Request() req, @Param('id') id: string) {
      return this.findNoteUsecase.execute(id, req.user.userId);
    }


    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Request() req, @Param('id') id: string, @Body() dto: CreateNoteDto) {
    return this.updateNoteUsecase.execute(id, req.user.userId, dto.title, dto.content ?? '');
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Request() req, @Param('id') id: string) {
    return this.deleteNoteUsecase.execute(id, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
    return this.findAllByUser.execute(req.user.userId);
    }


    
}
  