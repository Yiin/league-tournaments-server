import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';

@Controller('providers')
export class ProvidersController {
    constructor(
        private readonly providersService: ProvidersService,
    ) {}

    @Get()
    getAll() {
        return this.providersService.getAll();
    }

    @Post()
    async create(@Body() createProviderDto: CreateProviderDto) {
        await this.providersService.create(createProviderDto);
    }
}
