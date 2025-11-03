import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { UserRegisterRequestDto } from './dto/user-register.req.dto';
import { UserRoles } from './enums/user.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  async doUserRegistration(
    userRegister: UserRegisterRequestDto,
    role,
  ): Promise<User> {
    const user = new User();
    user.username = userRegister.username;
    user.password = userRegister.password;
    user.createdBy = userRegister.createdBy;
    if (role === 'sender') {
      user.role = UserRoles.SENDER;
    }
    if (role === 'receiver') {
      user.role = UserRoles.RECEIVER;
    }

    return await user.save();
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async getUserByUsername(username: string) {
    console.log(username);
    return await this.userRepository.findOne({ where: { username } });
  }

  async getUserById(id) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['projects'],
    });
  }

  async getNumberofAcc(id) {
    const acc = await this.userRepository.find({
      createdBy: id,
    });
    return acc;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id, updateUserDto: UpdateUserDto) {
    return `Update User is successfully !!!`;
  }

  async remove(id) {
    try {
      await this.userRepository.delete(id);
      return 'Account is Deleted';
    } catch (error) {
      throw error;
    }
  }
}
