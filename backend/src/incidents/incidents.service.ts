import { Injectable } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class IncidentsService {
    constructor(private prisma:PrismaService, private telegram:TelegramService) {}
    async createAlert(dto:CreateIncidentDto) {
            const incident = await this.prisma.incident.create({
      data: {
        service: dto.service,
        errorLog: dto.errorLog,
        status: 'OPEN',
      },
    });

    try {
      await this.telegram.sendIncidentAlert(incident);
    } catch (error) {
      console.error('Ошибка при отправке в Telegram:', error);
    }

    return incident;
    }
}
