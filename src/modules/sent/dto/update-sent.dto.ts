import { PartialType } from '@nestjs/mapped-types';
import { CreateSentDto } from './create-sent.dto';

export class UpdateSentDto extends PartialType(CreateSentDto) {}
