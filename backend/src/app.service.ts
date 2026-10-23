import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client'; 

@Injectable()
export class AppService {
  constructor(@InjectMetric("incidents_created_total") public incidentCounter: Counter<string>) {}
  getHello(): string {
    return 'Hello from my lair! <3';
  }

  incrementCounter(): string {
    try {
      this.incidentCounter.inc(); 
      
      return "succesfully saved, counter increased";
    } catch (error) {
      throw new Error("Failed saving data");
    }
  }
}
