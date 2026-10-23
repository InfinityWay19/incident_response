import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule } from '@nestjs/config';
import { IncidentsModule } from './incidents/incidents.module';
import { PrismaModule } from './prisma/prisma.module';
import { makeCounterProvider, PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [TelegramModule, ConfigModule.forRoot({isGlobal: true}), IncidentsModule, PrismaModule, PrometheusModule.register({path: "/metrics"})],
  controllers: [AppController],
  providers: [AppService, makeCounterProvider({name: 'incidents_created_total',
    help: 'Total number of successfully created incidents'})],
})
export class AppModule {}
