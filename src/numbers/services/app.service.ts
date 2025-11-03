import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppRepository } from '../repositories/apps.repository';
import { App } from '../entities/app.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AppRepository) private AppRepository: AppRepository,
  ) {}

  async create(createNumberDto: any): Promise<App> {
    const app = await this.AppRepository.create({
      name: createNumberDto.name,
      code: createNumberDto.code,
    });

    return await this.AppRepository.save(app);
  }

  findAll() {
    return `This action returns all numbers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} number`;
  }

  update(id: number, updateNumberDto: any) {
    return `This action updates a #${id} number`;
  }

  remove(id: number) {
    return `This action removes a #${id} number`;
  }
}
