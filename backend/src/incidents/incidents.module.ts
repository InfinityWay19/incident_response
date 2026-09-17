import { Module } from '@nestjs/common';
import { IncidentsController } from './incidents.controller';
import { IncidentsService } from './incidents.service';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  controllers: [IncidentsController],
  providers: [IncidentsService],
  imports: [TelegramModule]
})
export class IncidentsModule {}
