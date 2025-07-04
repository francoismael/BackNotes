import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './interfaces/auth.controller';
import { MongoAuthRepository } from './infrastructure/repositories/mongo-auth.repository';
import { AuthRepositoryToken } from './application/ports/auth.repository.token';
import { RegisterUsecase } from './application/usecases/register.usecase';
import { LoginUsecase } from './application/usecases/login.usecase';
import { userSchema } from './infrastructure/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    JwtModule.register({
      secret: 'SECRET_KEY', 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthRepositoryToken,
      useClass: MongoAuthRepository,
    },
    RegisterUsecase,
    LoginUsecase,
  ],
})
export class AuthModule {}
