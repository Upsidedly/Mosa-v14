import { ChatInputCommand, Command } from '@sapphire/framework';
import { isMessageInstance } from '@sapphire/discord.js-utilities';
import type { Message, TextChannel } from 'discord.js';

export class PingCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: 'ping',
            aliases: ['pong'],
            description: 'ping pong'
        });
    }

    public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('ping').setDescription(`You alive brah? (1.0.0)`)
        );
    }

    public async messageRun(message: Message) {
        const msg = await (message.channel as TextChannel).send('ping 🤨');

        const content = `pong! 🏓 (🔄: ${Math.round(this.container.client.ws.ping)}ms | 🫀: ${msg.createdTimestamp - message.createdTimestamp
            }ms)`;

        return msg.edit(content);
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        const msg = await interaction.reply({ content: `ping 🤨`, fetchReply: true });

        if (isMessageInstance(msg)) {
            const diff = msg.createdTimestamp - interaction.createdTimestamp;
            const ping = Math.round(this.container.client.ws.ping);
            return interaction.editReply(`pong! 🏓 (🔄: \`${diff}ms\` | 🫀: \`${ping}ms)\``);
        }

        return interaction.editReply('Failed to retrieve ping :(');
    }
}