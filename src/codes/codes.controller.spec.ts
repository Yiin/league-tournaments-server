import { Test, TestingModule } from '@nestjs/testing';
import { CodesController } from './codes.controller';

describe('Codes Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CodesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: CodesController = module.get<CodesController>(CodesController);
    expect(controller).toBeDefined();
  });
});
