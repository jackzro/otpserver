import { Injectable } from '@nestjs/common';
import { CreateSentDto } from './dto/create-sent.dto';
import { UpdateSentDto } from './dto/update-sent.dto';
import { getManager } from 'typeorm';

@Injectable()
export class SentService {
  async create(createSentDto: any) {
    const entityManager = getManager();
    const result = await entityManager.query(
      `SELECT date(time_create) as date, count(*) as row_count from trx_sent WHERE id_user=${createSentDto.id} and time_create between '${createSentDto.start}' and '${createSentDto.end}' group by date(time_create)`,
    );
    return result;
  }

  async findAll() {
    const entityManager = getManager();
    const result = await entityManager.query(`SELECT * from trx_sent`);
    return result;
  }

  async findOne(id: number) {
    const entityManager = getManager();
    const result = await entityManager.query(
      `SELECT date(time_create) as date, count(*) as row_count from trx_sent WHERE id_user=${id} and time_create between '2024-12-01' and '2024-12-31' group by date(time_create)`,
    );
    // const result = await entityManager.query(
    //   `SELECT date(time_create) as date, count(*) as row_count from trx_sent WHERE time_create between '2024-12-01' and '2024-12-31' group by date(time_create)`,
    // );
    return result;
  }

  update(id: number, updateSentDto: UpdateSentDto) {
    return `This action updates a #${id} sent`;
  }

  remove(id: number) {
    return `This action removes a #${id} sent`;
  }
}
