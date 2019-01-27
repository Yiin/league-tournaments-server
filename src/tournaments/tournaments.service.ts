import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/global/database/database.service';
import { RiotApiService } from 'src/riot-api/riot-api.service';
import { CreateTournamentDto } from './dto/createTournament.dto';
import { ProvidersService } from 'src/providers/providers.service';

@Injectable()
export class TournamentsService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly riotApiService: RiotApiService,
        private readonly providersService: ProvidersService,
    ) {
        this.databaseService.getDatabase().defaults({
            tournaments: [],
        }).write();
    }

    getTable() {
        return this.databaseService.getDatabase().get('tournaments');
    }

    getAll() {
        return this.getTable().value();
    }

    find(providerId: number) {
        return this.getTable()
            .find({ id: providerId });
    }

    async create(createTournamentDto: CreateTournamentDto) {
        const { name, providerId } = createTournamentDto;

        const { region } = this.providersService
            .find(providerId).value();

        try {
            const tournamentId = await this.riotApiService.post(
                region,
                '/tournament-stub/v4/tournaments',
                {
                    name,
                    providerId,
                },
            );

            this.getTable().push({
                id: tournamentId,
                providerId,
                name,
            }).write();
        } catch (e) {
            throw e;
        }
    }
}
