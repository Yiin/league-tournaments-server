import { Test, TestingModule } from '@nestjs/testing';
import { ProvidersController } from './providers.controller';

describe('Providers Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ProvidersController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ProvidersController = module.get<ProvidersController>(ProvidersController);
    expect(controller).toBeDefined();
  });
});
