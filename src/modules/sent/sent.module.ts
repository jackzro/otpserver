import { Module } from '@nestjs/common';
import { SentService } from './sent.service';
import { SentController } from './sent.controller';

@Module({
  controllers: [SentController],
  providers: [SentService]
})
export class SentModule {}
