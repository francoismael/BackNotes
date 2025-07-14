import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthRepositoryToken } from "../ports/auth.repository.token";
import { AuthRepository } from "../ports/auth.repository.interface";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { identity } from "rxjs";

@Injectable()

export class LoginUsecase {
    constructor(
        @Inject(AuthRepositoryToken)
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService,
    ){}

    async execute(email: string, password: string): Promise<{ access_token: string}>{
        const user = await this.authRepository.findByEmail(email);
        if (!user) throw new UnauthorizedException('user invalid');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('mot de passe invalid');

        const playload = {sub: user.id, email: user.email};
        const token = this.jwtService.sign(playload)

        return { access_token: token};
    }
}