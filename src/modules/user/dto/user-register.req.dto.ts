import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { MESSAGES, REGEX } from 'src/app.utils';
import { UserRoles } from '../enums/user.enum';

export class UserRegisterRequestDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  role: UserRoles;
  createdBy: string;
}
