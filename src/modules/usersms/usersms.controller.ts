import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { UsersmsService } from './usersms.service';
import { CreateUsersmDto } from './dto/create-usersm.dto';
import { UpdateUsersmDto } from './dto/update-usersm.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('usersms')
export class UsersmsController {
  constructor(private readonly usersmsService: UsersmsService) {}

  @Post()
  create(@Body() createUsersmDto: CreateUsersmDto) {
    return this.usersmsService.create(createUsersmDto);
  }

  @Post('login')
  login(@Body() username: string, password: string) {
    return this.usersmsService.login(username, password);
  }

  @Post('example')
  exampleHandler(@Req() req: Request, @Body() body: any) {
    console.log('Headers:', req.headers);
    console.log('Authorization Header:', req.headers['authorization']);
    console.log('Body:', body);

    return { message: 'Headers received' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('balance')
  balance(@Request() req) {
    console.log(req.user, 'masukk');
    //@ts-ignore
    const id = req.user.id;
    return this.usersmsService.balance(id);
  }

  @Get()
  findAll() {
    return this.usersmsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersmsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersmDto: UpdateUsersmDto) {
    return this.usersmsService.update(+id, updateUsersmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersmsService.remove(+id);
  }
}
