import { ChatInputCommand, Command } from '@sapphire/framework';
import { ActionRow, ActionRowBuilder, ButtonBuilder, Message, TextChannel } from 'discord.js';
import got from 'got';

export class PingCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: 'inspire',
            aliases: ['inspiration', 'inspirequote'],
            description: 'feel good cha\'now'
        });
    }

    public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('inspire').setDescription(`feel good cha\'now (1.0.0)`)
            , { idHints: ['1083955390120730746'] });
    }

    private quoteCache = [] as { q: string, a: string, c: string, h: string }[]

    private async getQuotesAndApplyToCache() {
        if (this.quoteCache.length === 0) {
            this.quoteCache = await got('https://zenquotes.io/api/quotes/').json<{ q: string, a: string, c: string, h: string }[]>()
        }
        return this.quoteCache.shift()!
    }

    public async messageRun(message: Message) {
        const q = await this.getQuotesAndApplyToCache()
        const m = await message.reply( `> ${q.q}\n- ${q.a}`)
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        const q = await this.getQuotesAndApplyToCache()
        await interaction.reply( `> ${q.q}\n- ${q.a}`)
    }
}