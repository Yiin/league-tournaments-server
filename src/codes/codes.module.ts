import { Module } from '@nestjs/common';
import { CodesService } from './codes.service';
import { CodesController } from './codes.controller';
import { TournamentId } from './validators/tournament-id.validator';
import { GlobalModule } from 'src/global/global.module';
import { RiotApiModule } from 'src/riot-api/riot-api.module';
import { TournamentsModule } from 'src/tournaments/tournaments.module';

@Module({
  controllers: [CodesController],
  providers: [CodesService, TournamentId],
  imports: [GlobalModule, RiotApiModule, TournamentsModule],
})
export class CodesModule {}
