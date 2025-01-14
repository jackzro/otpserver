import { Test, TestingModule } from '@nestjs/testing';
import { UsersmsService } from './usersms.service';

describe('UsersmsService', () => {
  let service: UsersmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersmsService],
    }).compile();

    service = module.get<UsersmsService>(UsersmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
