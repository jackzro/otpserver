import { Test, TestingModule } from '@nestjs/testing';
import { SentService } from './sent.service';

describe('SentService', () => {
  let service: SentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SentService],
    }).compile();

    service = module.get<SentService>(SentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
