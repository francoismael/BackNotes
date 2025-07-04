import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateNote {
    @IsNotEmpty()
    title: String;

    @IsOptional()
    content?: String;
}