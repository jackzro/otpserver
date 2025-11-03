import { Module } from '@nestjs/common';
import { NumbersService } from './services/numbers.service';
import { NumbersController } from './controllers/numbers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumber } from './entities/number.entity';
import { NumberReceiver } from './entities/number-receiver.entity';
import { App } from './entities/app.entity';
import { OtpRequest } from './entities/otp-request.entity';
import { OtpEvent } from './entities/otp-event.entity';
import { AppRepository } from './repositories/apps.repository';
import { AppService } from './services/app.service';
import { AppsController } from './controllers/apps.controller';
import { PhoneNumberRepository } from './repositories/numbers.repository';
import { OtpRequestRepository } from './repositories/otp-request.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AppRepository,
      PhoneNumberRepository,
      OtpRequestRepository,
      PhoneNumber,
      NumberReceiver,
      App,
      OtpRequest,
      OtpEvent,
    ]),
  ],
  controllers: [NumbersController, AppsController],
  providers: [NumbersService, AppService],
  exports: [TypeOrmModule, NumbersService, AppService],
})
export class NumbersModule {}
