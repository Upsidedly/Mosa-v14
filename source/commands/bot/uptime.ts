import { ChatInputCommand, Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import ms from 'ms'

export class PingCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: 'uptime',
            aliases: ['timeup'],
            description: 'i been living fr'
        });
    }

    public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('uptime').setDescription(`I been living fr (1.0.0)`)
            , { idHints: ['1083952571519074334'] });
    }

    public async messageRun(message: Message) {
        message.reply(`🛋️ ${ms(this.container.uptime())}`)
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        await interaction.reply(`🛋️ ${ms(this.container.uptime())}`)
    }
}