import { Inject, Injectable } from "@nestjs/common";
import { AuthRepositoryToken } from "../ports/auth.repository.token";
import { AuthRepository } from "../ports/auth.repository.interface";
import { User } from "../../domain/entities/user";
import * as bcrypt from 'bcrypt';


@Injectable()
export class RegisterUsecase {
    constructor(
        @Inject(AuthRepositoryToken)
        private readonly authRepository: AuthRepository,
    ){}

    async execute(username: string, email: string, password: string): Promise<User>{
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User(
            '',
            username,
            email, 
            hashedPassword,
        )
        return this.authRepository.register(newUser);
    }
}