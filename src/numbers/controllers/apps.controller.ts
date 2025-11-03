import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller('app')
export class AppsController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() createNumberDto: any) {
    return this.appService.create(createNumberDto);
  }

  @Get()
  findAll() {
    return this.appService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNumberDto: any) {
    return this.appService.update(+id, updateNumberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appService.remove(+id);
  }
}
