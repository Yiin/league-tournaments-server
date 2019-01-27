import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/global/database/database.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { RiotApiService } from 'src/riot-api/riot-api.service';

@Injectable()
export class ProvidersService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly riotApiService: RiotApiService,
    ) {
        this.databaseService.getDatabase()
            .defaults({
                providers: [],
            })
            .write();
    }

    getTable() {
        return this.databaseService.getDatabase().get('providers');
    }

    getAll() {
        return this.getTable().value();
    }

    find(providerId: number) {
        return this.getTable().find({ id: providerId });
    }

    async create(createProviderDto: CreateProviderDto) {
        const { name, region } = createProviderDto;

        const url = `https://ggg-bot.yiin.lt/tournament-game-results/${name}`;

        try {
            const providerId = await this.riotApiService.post(
                region,
                '/tournament-stub/v4/providers',
                {
                    region,
                    url,
                },
            );

            this.getTable().push({
                id: providerId,
                name,
                region,
            }).write();
        } catch (e) {
            throw e;
        }
    }
}
