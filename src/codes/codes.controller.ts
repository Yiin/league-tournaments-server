import { Controller, Get, Post, Body } from '@nestjs/common';
import { CodesService } from './codes.service';
import { CreateCodeDto } from './dto/create-code.dto';

@Controller('codes')
export class CodesController {
    constructor(
        private readonly codesService: CodesService,
    ) {}

    @Get()
    availableCodes() {
        return this.codesService.getAvailableCodes();
    }

    @Post()
    async create(@Body() createCodeDto: CreateCodeDto) {
        await this.codesService.create(createCodeDto);
    }
}
