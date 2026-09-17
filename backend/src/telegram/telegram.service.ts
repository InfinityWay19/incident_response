import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
    private chatId: string;
    private bot: Telegraf;
    constructor(private configService: ConfigService) {
        const token = this.configService.getOrThrow("TELEGRAM_BOT_TOKEN");
        this.chatId = this.configService.getOrThrow("TELEGTAM_CHAT_ID");
        this.bot = new Telegraf(token);
    }
    async sendIncidentAlert(incident: {id: number; service: string; errorLog: string;}) {
        const message = 
            `*КРИТИЧЕСКИЙ ИНЦИДЕНТ \#${incident.id}*

            🖥 *Сервис:* \`${incident.service}\`
            ⏱️ *Статус:* \`OPEN\`

            📝 *Лог ошибки:*
            \`\`\`
            ${incident.errorLog}
            \`\`\``;

        await this.bot.telegram.sendMessage(this.chatId, message, {
            parse_mode: "MarkdownV2"
        })
    }
}