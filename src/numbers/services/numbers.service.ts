import { Injectable } from '@nestjs/common';
import { PhoneNumberRepository } from '../repositories/numbers.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneNumber } from '../entities/number.entity';
import { OtpRequestRepository } from '../repositories/otp-request.repository';
import { OtpRequest } from '../entities/otp-request.entity';
import { AppRepository } from '../repositories/apps.repository';

@Injectable()
export class NumbersService {
  constructor(
    @InjectRepository(PhoneNumberRepository)
    private phoneNumberRepository: PhoneNumberRepository,
    private otpRequestRepository: OtpRequestRepository,
    private appRepository: AppRepository,
  ) {}

  async changeStatus(data) {
    return await this.otpRequestRepository.update(data.id, {
      status: data.status,
      requestedAt: new Date(),
    });
  }

  async sendotp(data, req) {
    return await this.otpRequestRepository.update(data.id, {
      otpCode: data.otpcode,
      sender: req.user.id,
      filledAt: new Date(),
    });
  }
  async create(createNumberDto: any, req: any) {
    const phone_number = new PhoneNumber();
    phone_number.phone_number = createNumberDto.number;
    phone_number.createdBy = req;
    const saved = await phone_number.save();

    const platform = await this.appRepository.find();
    platform.map(async (app) => {
      const otpReq = await this.otpRequestRepository.create({
        status: 'pending',
        number: saved,
        app: app,
      });

      return await this.otpRequestRepository.save(otpReq);
    });

    return 'This action adds a new number';
  }

  async findAll() {
    return await this.phoneNumberRepository.find({
      relations: ['otpRequests', 'otpRequests.app'], // load OTP + App relation
      order: { id: 'DESC' },
    });
  }

  async findOne(id: any) {
    console.log(id);
    return await this.otpRequestRepository.find({
      where: {
        number: id,
      },
      relations: ['app', 'number'],
    });
  }

  update(id: number, updateNumberDto: any) {
    return `This action updates a #${id} number`;
  }

  remove(id: number) {
    return `This action removes a #${id} number`;
  }
}
