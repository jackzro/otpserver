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
} from '@nestjs/common';
import { NumbersService } from '../services/numbers.service';
import { CreateNumberDto } from '../dto/create-number.dto';
import { UpdateNumberDto } from '../dto/update-number.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@Controller('numbers')
export class NumbersController {
  constructor(private readonly numbersService: NumbersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createNumberDto: CreateNumberDto, @Req() req) {
    return this.numbersService.create(createNumberDto, req.user.id);
  }

  @Post('sendotp')
  @UseGuards(JwtAuthGuard)
  sendOtp(@Body() data, @Req() req) {
    return this.numbersService.sendotp(data, req);
  }

  @Post('status')
  @UseGuards(JwtAuthGuard)
  changeStatus(@Body() data) {
    return this.numbersService.changeStatus(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.numbersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.numbersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNumberDto: UpdateNumberDto) {
    return this.numbersService.update(+id, updateNumberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.numbersService.remove(+id);
  }
}
