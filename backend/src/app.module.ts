import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule } from '@nestjs/config';
import { IncidentsModule } from './incidents/incidents.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [TelegramModule, ConfigModule.forRoot({isGlobal: true}), IncidentsModule, PrismaModule, PrometheusModule.register({path: "/metrics"})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
