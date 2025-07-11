import { Module } from '@nestjs/common';
import { SentService } from './sent.service';
import { SentController } from './sent.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [SentController],
  providers: [SentService],
})
export class SentModule {}
