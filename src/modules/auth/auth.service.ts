import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUserCreds(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);
    console.log(user);
    if (!user)
      throw new BadRequestException({
        error: 'username is not registered !!!',
      });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return {
      message: 'Incorrect Email or Password',
    };
    // const ispassword = await this.userService.login(username, password);
    // if (!ispassword)
    //   throw new UnauthorizedException({ error: 'Wrong Password !!!' });
    // return user[0];
  }

  tokenbuild(data: any) {}

  generateToken(user: any) {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
        smpp_status: user.smpp_status,
        role: user.role,
      }),
      payload: {
        username: user.username,
        dr: user.delivery_type,
        is_active: user.is_active,
        id: user.id,
        type: user.api_type,
        role: user.role,
      },
    };
  }
}
