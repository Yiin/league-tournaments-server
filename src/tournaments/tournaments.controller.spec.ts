import { Test, TestingModule } from '@nestjs/testing';
import { TournamentsController } from './tournaments.controller';

describe('Tournaments Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TournamentsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: TournamentsController = module.get<TournamentsController>(TournamentsController);
    expect(controller).toBeDefined();
  });
});
