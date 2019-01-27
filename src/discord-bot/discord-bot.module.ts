import { Module } from '@nestjs/common';
import { DiscordBotService } from './discord-bot.service';
import { CommandsService } from './commands/commands.service';
import { CodesModule } from 'src/codes/codes.module';

@Module({
  providers: [DiscordBotService, CommandsService],
  imports: [CodesModule],
})
export class DiscordBotModule {}
