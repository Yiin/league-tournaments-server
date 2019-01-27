import { Injectable } from '@nestjs/common';
import { DiscordBotService } from '../discord-bot.service';
import { Message } from 'discord.js';
import { CodesService } from 'src/codes/codes.service';

type CommandHandler = (commandHandlerArgs: { message: Message, args: string[], command: string }) => Promise<void>;

interface Command {
    [key: string]: CommandHandler;
}

@Injectable()
export class CommandsService {
    private commands: Command = {};

    constructor(
        private readonly discordBotService: DiscordBotService,
        private readonly codesService: CodesService,
    ) {
        this.discordBotService.on('message', this.handleMessage);

        this.registerCommand('custom', this.createCustomGame);
    }

    async createCustomGame({ message: Message, args: string[], command: string }) {
        this.codesService.create({
            // WIP
        });
    }

    registerCommand(commandName: string, handler: CommandHandler) {
        this.commands[commandName] = handler;
    }

    handleMessage(message) {
        if (message.author.bot) {
            return;
        }

        const [, command] = /\/(\w+)\s/.exec(message.content);

        if (!this.commands[command]) {
            message.reply('I don\'t know this command :(');
            return;
        }

        const args = message.content
            // remove slash
            .slice(1)
            // remove spaces
            .trim()
            // split arguments
            .split(/\s+/g)
            // remove command from arguments
            .splice(1);

        this.commands[command]({ message, command, args })
            .catch(err => console.error(err));
    }
}
