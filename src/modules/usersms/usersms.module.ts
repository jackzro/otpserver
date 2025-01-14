import { forwardRef, Module } from '@nestjs/common';
import { UsersmsService } from './usersms.service';
import { UsersmsController } from './usersms.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UsersmsController],
  providers: [UsersmsService],
  exports: [UsersmsService],
})
export class UsersmsModule {}
