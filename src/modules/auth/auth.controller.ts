import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Header,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Res() res: Response, @Request() req): Promise<any> {
    const data = await this.authService.generateToken(req.user);
    res.cookie('token', data.access_token, {
      httpOnly: true,
      sameSite: 'none', // For cross-origin requests
    });
    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async user(@Request() req): Promise<any> {
    return 'berhsail';
  }
}
