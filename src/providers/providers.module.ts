import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { IsUniqueProvider } from './validators/IsUniqueProvider.validator';
import { GlobalModule } from 'src/global/global.module';
import { RiotApiModule } from 'src/riot-api/riot-api.module';

@Module({
  controllers: [ProvidersController],
  providers: [ProvidersService, IsUniqueProvider],
  imports: [GlobalModule, RiotApiModule],
  exports: [ProvidersService],
})
export class ProvidersModule {}
