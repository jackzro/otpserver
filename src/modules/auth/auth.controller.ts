import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
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
    const user = await this.authService.generateToken(req.user);
    // res.cookie('nextauth.token', user.access_token, {
    //   // httpOnly: true,
    //   // secure: true, // Ensure this is true for HTTPS
    //   sameSite: 'lax', // Required for cross-origin cookies
    // });
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async user(@Request() req): Promise<any> {
    return 'berhsail';
  }
}
