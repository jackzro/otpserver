import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersmsService } from '../usersms/usersms.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private userSmsService: UsersmsService,
    private jwtService: JwtService,
  ) {}
  async validateUserCreds(username: string, password: string): Promise<any> {
    const user = await this.userSmsService.findUsername(username);
    if (!user[0])
      throw new BadRequestException({
        error: 'username is not registered !!!',
      });
    const ispassword = await this.userSmsService.login(username, password);
    if (!ispassword)
      throw new UnauthorizedException({ error: 'Wrong Password !!!' });
    return user[0];
  }

  tokenbuild(data: any) {}

  generateToken(user: any) {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
        smpp_status: user.smpp_status,
      }),
      payload: {
        username: user.username,
        dr: user.delivery_type,
        is_active: user.is_active,
        id: user.id,
        type: user.api_type,
      },
    };
  }
}
