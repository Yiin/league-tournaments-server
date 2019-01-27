import { Test, TestingModule } from '@nestjs/testing';
import { ProvidersService } from './providers.service';

describe('ProvidersService', () => {
    let service: ProvidersService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProvidersService],
        }).compile();
        service = module.get<ProvidersService>(ProvidersService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
