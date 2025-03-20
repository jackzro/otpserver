import { Injectable } from '@nestjs/common';
import { CreateSentDto } from './dto/create-sent.dto';
import { UpdateSentDto } from './dto/update-sent.dto';
import { getManager } from 'typeorm';

@Injectable()
export class SentService {
  async create(createSentDto: any) {
    const entityManager = getManager();
    const result = await entityManager.query(
      `SELECT date(time_create) as date, count(*) as row_count from trx_sent WHERE id_user=${createSentDto.id} and time_create between '${createSentDto.start}' and '${createSentDto.end}' group by date(time_create) ORDER BY DATE(time_create) ASC`,
    );
    return result;
  }

  async report(createSentDto: any) {
    const entityManager = getManager();
    const result = await entityManager.query(
      `SELECT * from trx_sent WHERE id_user=${createSentDto.id} and time_create between '${createSentDto.start}' and '${createSentDto.end}'`,
    );

    const newRes = [];

    function parseSMPPReport(report) {
      let result = {};
      let parts = report.split(/\s+/); // Split by whitespace

      parts.forEach((part) => {
        let [key, value] = part.split(':');
        if (key && value !== undefined) {
          result[key] = value;
        }
      });

      newRes.push(JSON.parse(JSON.stringify(result, null, 2)));

      return JSON.parse(JSON.stringify(result, null, 2));

      return JSON.stringify(result, null, 2);
    }

    result.map((res) => {
      if (res.response.response_dr === false) {
        return;
      } else {
        parseSMPPReport(res.response.response_dr.short_message.message);
      }
    });

    let statCount = newRes.reduce((acc, obj) => {
      acc[obj.stat] = (acc[obj.stat] || 0) + 1;
      return acc;
    }, {});

    // let jsonReport = parseSMPPReport(
    //   result[1].response.response_dr.short_message.message,
    // );

    return statCount;

    // return JSON.parse(result[1].response.response_dr.short_message.message);

    // return result;
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
