import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { SentService } from './sent.service';
import { CreateSentDto } from './dto/create-sent.dto';
import { UpdateSentDto } from './dto/update-sent.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from './sent.decorator';

@Controller('sent')
export class SentController {
  constructor(private readonly sentService: SentService) {}

  @Get('userall')
  getAllUser() {
    return this.sentService.getUserAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() createSentDto: any) {
    //@ts-ignore
    const id = createSentDto.id;
    return this.sentService.create({
      id: id,
      //@ts-ignore
      start: `${createSentDto.start.year}-${
        createSentDto.start.month < 10 ? '0' : ''
      }${createSentDto.start.month}-${createSentDto.start.day < 10 ? '0' : ''}${
        createSentDto.start.day
      }`,
      //@ts-ignore
      end: `${createSentDto.end.year}-${
        createSentDto.end.month < 10 ? '0' : ''
      }${createSentDto.end.month}-${createSentDto.end.day < 10 ? '0' : ''}${
        createSentDto.end.day
      }`,
    });
  }

  @Post('reportvo')
  @UseGuards(JwtAuthGuard)
  reportVO(@Request() req, @Body() createSentDto: any) {
    //@ts-ignore
    const id = createSentDto.id;
    return this.sentService.reportVO({
      id: id,
      //@ts-ignore
      start: `${createSentDto.start.year}-${
        createSentDto.start.month < 10 ? '0' : ''
      }${createSentDto.start.month}-${createSentDto.start.day < 10 ? '0' : ''}${
        createSentDto.start.day
      }`,
      //@ts-ignore
      end: `${createSentDto.end.year}-${
        createSentDto.end.month < 10 ? '0' : ''
      }${createSentDto.end.month}-${createSentDto.end.day < 10 ? '0' : ''}${
        createSentDto.end.day
      }`,
    });
  }

  @Post('report')
  @UseGuards(JwtAuthGuard)
  report(@Request() req, @Body() createSentDto: any) {
    //@ts-ignore
    const id = createSentDto.id;
    return this.sentService.report({
      id: id,
      //@ts-ignore
      start: `${createSentDto.start.year}-${
        createSentDto.start.month < 10 ? '0' : ''
      }${createSentDto.start.month}-${createSentDto.start.day < 10 ? '0' : ''}${
        createSentDto.start.day
      }`,
      //@ts-ignore
      end: `${createSentDto.end.year}-${
        createSentDto.end.month < 10 ? '0' : ''
      }${createSentDto.end.month}-${createSentDto.end.day < 10 ? '0' : ''}${
        createSentDto.end.day
      }`,
    });
  }

  @Post('voiceotp')
  @UseGuards(JwtAuthGuard)
  async sentVoiceOtp(@Req() req: Request, @Body() body: any) {
    //@ts-ignore
    const id = req.user.id;

    return await this.sentService.findOne(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findById(@Req() req: Request) {
    //@ts-ignore
    const id = req.user.id;
    return await this.sentService.findOne(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.sentService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSentDto: UpdateSentDto) {
    return this.sentService.update(+id, updateSentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sentService.remove(+id);
  }
}
