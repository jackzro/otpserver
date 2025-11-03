import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { AuthModule } from '../auth/auth.module';
import { User } from './entities/user.entity';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([UserRepository, User]),
    forwardRef(() => AuthModule),
  ],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
