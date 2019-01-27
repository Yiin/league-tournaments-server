import { Controller, Get, Post, Body } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/createTournament.dto';

@Controller('tournaments')
export class TournamentsController {
    constructor(
        private readonly tournamentsService: TournamentsService,
    ) {}

    @Get()
    getAll() {
        return this.tournamentsService.getAll();
    }

    @Post()
    create(@Body() createTournamentDto: CreateTournamentDto) {
        this.tournamentsService.create(createTournamentDto);
    }
}
