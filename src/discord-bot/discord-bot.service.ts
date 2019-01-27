import { Injectable } from '@nestjs/common';
import * as Discord from 'discord.js';

@Injectable()
export class DiscordBotService {
    private client: Discord.Client;

    constructor() {
        this.client = new Discord.Client();

        this.login();
    }

    login() {
        this.client.login(process.env.DISCORD_BOT_TOKEN);
    }

    on(event, callback) {
        return this.client.on(event, callback);
    }
}
