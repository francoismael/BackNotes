import { User } from "../../domain/entities/user";

export interface AuthRepository {
    register(user: User): Promise<User>
    findByEmail(email: string): Promise<User | null>
}