import { Injectable } from '@nestjs/common';
import { CreateUsersmDto } from './dto/create-usersm.dto';
import { UpdateUsersmDto } from './dto/update-usersm.dto';
import { getManager } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class UsersmsService {
  hashWithMD5(data: string): string {
    return crypto.createHash('md5').update(data).digest('hex');
  }

  hashWithSHA1(data: string): string {
    return crypto.createHash('sha1').update(data).digest('hex');
  }

  create(createUsersmDto: CreateUsersmDto) {
    return 'This action adds a new usersm';
  }

  async balance(id) {
    const entityManager = getManager();
    const result = await entityManager.query(
      `SELECT balance from public."user" WHERE id=${id}`,
    );
    return result;
  }

  async findAll() {
    const entityManager = getManager();
    const result = await entityManager.query(`SELECT * from public."user"`);
    return result;
  }

  async findUsername(username: string) {
    const entityManager = getManager();
    const result = await entityManager.query(
      //@ts-ignore
      `SELECT * from public."user" WHERE username='${username}'`,
    );
    return result;
  }

  async login(username: string, password: string) {
    const entityManager = getManager();
    const result = await entityManager.query(
      //@ts-ignore
      `SELECT * from public."user" WHERE username='${username}'`,
    );
    //@ts-ignore
    const sha1encryption = this.hashWithSHA1(password);
    const md5encryption = this.hashWithMD5(sha1encryption);
    return md5encryption === result[0].password;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersm`;
  }

  update(id: number, updateUsersmDto: UpdateUsersmDto) {
    return `This action updates a #${id} usersm`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersm`;
  }
}
