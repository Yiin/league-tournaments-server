import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/global/database/database.service';
import { CreateCodeDto } from './dto/create-code.dto';
import { CodeDto } from './dto/code.dto';
import { RiotApiService } from 'src/riot-api/riot-api.service';
import { TournamentsService } from 'src/tournaments/tournaments.service';
import { ProvidersService } from 'src/providers/providers.service';

@Injectable()
export class CodesService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly riotApiService: RiotApiService,
        private readonly tournamentsService: TournamentsService,
        private readonly providersService: ProvidersService,
    ) {
        this.databaseService.getDatabase().defaults({
            codes: [],
        }).write();
    }

    getTable() {
        return this.databaseService.getDatabase().get('codes');
    }

    getAvailableCodes() {
        return this.getTable()
            .filter({ isAvailable: true })
            .value();
    }

    find(codeId) {
        return this.getTable().find({
            id: codeId,
        });
    }

    async create(createCodeDto: CreateCodeDto) {
        const {
            allowedSummonerNames = [],
            tournamentId,
            pickType,
            mapType,
            teamSize,
            spectatorType,
            metadata,
        } = createCodeDto;

        const allowedSummonerIds = await Promise.all(
            allowedSummonerNames.map(async name => {
                const { accountId } = await this.riotApiService.get(
                    region,
                    `/summoner/v4/summoners/by-name/${name}`,
                );
                return accountId;
            }),
        );

        const { providerId } = this.tournamentsService
            .find(tournamentId)
            .value();

        const { region } = this.providersService
            .find(providerId)
            .value();

        try {
            const codes = await this.riotApiService.post(
                region,
                `/tournament-stub/v4/codes?count=1&tournamentId=${tournamentId}`,
                {
                    ...(allowedSummonerIds.length > 0 && { allowedSummonerIds }),
                    pickType,
                    mapType,
                    teamSize,
                    spectatorType,
                    metadata,
                },
            );
            const [code] = codes;

            // TODO:
            // 1. Leisti sugeneruoti keleta kodu vienu metu (preferably atskiras metodas)
            // 2. Cachinti gautus duomenis iš riot api, kad nerequestinti be reikalo
            // 3. Sukurti discord boto komanda matchui generuoti
            // 4. tournament scheduling logic

            this.getTable().push({
                code,
                tournamentId,
                allowedSummonerIds,
                mapType,
                metadata,
                pickType,
                spectatorType,
                teamSize,
            }).write();
        } catch (e) {
            throw e;
        }
    }
}
