import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  title: String;

  @IsOptional()
  content?: String;
}

