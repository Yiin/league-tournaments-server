import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordBotModule } from './discord-bot/discord-bot.module';
import { GlobalModule } from './global/global.module';
import { RiotApiModule } from './riot-api/riot-api.module';
import { ProvidersModule } from './providers/providers.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { CodesModule } from './codes/codes.module';

@Module({
  imports: [
    DiscordBotModule,
    GlobalModule,
    RiotApiModule,
    ProvidersModule,
    TournamentsModule,
    CodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
