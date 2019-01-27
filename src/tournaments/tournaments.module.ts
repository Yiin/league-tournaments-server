import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { IsUniqueTournament } from './validators/IsUniqueTournament.validator';
import { ProviderId } from './validators/ProviderId.validator';
import { TournamentsController } from './tournaments.controller';
import { RiotApiModule } from 'src/riot-api/riot-api.module';
import { ProvidersModule } from 'src/providers/providers.module';
import { GlobalModule } from 'src/global/global.module';

@Module({
  controllers: [TournamentsController],
  providers: [TournamentsService, IsUniqueTournament, ProviderId],
  imports: [GlobalModule, RiotApiModule, ProvidersModule],
  exports: [TournamentsService],
})
export class TournamentsModule {}
