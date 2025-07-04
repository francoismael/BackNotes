import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUsecase } from "../application/usecases/register.usecase";
import { LoginUsecase } from "../application/usecases/login.usecase";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Controller('authentication')
export class AuthController {
    constructor(
        private readonly registerUsecase: RegisterUsecase,
        private readonly loginUsecase: LoginUsecase,
    ){}

    @Post('register')
    async register(@Body() dto: RegisterDto){
        return this.registerUsecase.execute(dto.username, dto.email, dto.password);
    }

    @Post('login')
    async login(@Body() dto: LoginDto){
        return this.loginUsecase.execute(dto.email, dto.password);
    }
}