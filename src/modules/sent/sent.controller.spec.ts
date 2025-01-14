import { Test, TestingModule } from '@nestjs/testing';
import { SentController } from './sent.controller';
import { SentService } from './sent.service';

describe('SentController', () => {
  let controller: SentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SentController],
      providers: [SentService],
    }).compile();

    controller = module.get<SentController>(SentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
