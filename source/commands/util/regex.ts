import { ChatInputCommand, Command } from '@sapphire/framework';
import { Message } from 'discord.js';
import got from 'got';
import safe from 'safe-regex2'

/\s/

export class PingCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: 'regex',
            aliases: ['regextest', 'testgex', 'retest', 'testregex', 'gex', 'rgx'],
            description: 'test a regex query'
        });
    }

    public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('regex').setDescription(`test a regex query (1.0.0)`).addStringOption((s) => s.setName('regex').setDescription('The regex to query').setRequired())
            , { idHints: ['1083957939590660116'] });
    }

    public async messageRun(message: Message) {
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    }
}