import { Body, Controller, Post } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { IncidentsService } from './incidents.service';

@Controller('webhook/alerts')
export class IncidentsController {
constructor(private incidentsService:IncidentsService) {}
    @Post()
  async handleAlert(@Body() dto: CreateIncidentDto) {
    console.log(`Получен новый алерт от сервиса: ${dto.service}`);
    return this.incidentsService.createAlert(dto);
  }
}
