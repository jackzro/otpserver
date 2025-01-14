import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersmDto } from './create-usersm.dto';

export class UpdateUsersmDto extends PartialType(CreateUsersmDto) {}
