import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import appConfig from '../../config/app.config';
import { Request } from 'express';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          console.log(request.headers);
          try {
            const secretToken = request.headers.cookie.split('; ');
            console.log('secret', secretToken);
            let result = {};
            secretToken.forEach((item) => {
              const temp = item.split('=');
              console.log('temp', temp);
              result[temp[0]] = temp[1];
            });
            console.log('Result', result);
            return result['nextauth.token'];
          } catch (error) {
            return error;
          }
        },
      ]),
      secretOrKey: appConfig().appSecret,
    });
  }

  async validate(payload: any) {
    console.log('payload', payload);
    return {
      id: payload.sub,
      role: payload.role,
    };
  }
}
