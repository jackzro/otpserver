import { Test, TestingModule } from '@nestjs/testing';
import { UsersmsController } from './usersms.controller';
import { UsersmsService } from './usersms.service';

describe('UsersmsController', () => {
  let controller: UsersmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersmsController],
      providers: [UsersmsService],
    }).compile();

    controller = module.get<UsersmsController>(UsersmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
