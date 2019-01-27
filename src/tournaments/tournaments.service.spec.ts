import { Test, TestingModule } from '@nestjs/testing';
import { TournamentsService } from './tournaments.service';

describe('TournamentsService', () => {
  let service: TournamentsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TournamentsService],
    }).compile();
    service = module.get<TournamentsService>(TournamentsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
