import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';
import mongoose from 'mongoose'
import './lib/setup.js'

const client = new SapphireClient({
    regexPrefix: /^(mosa\s+|\$)/,
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    loadMessageCommandListeners: true
});

try {
    client.logger.info('Connectiong to mongoose...')
    await mongoose.connect(process.env.DATABASE_URI!)
    client.logger.info('Connected to mongoose successfully.')

    client.logger.info('Connecting to client...')
    await client.login(process.env.TOKEN);
    client.logger.info('Connected to client successfully.')
} catch (e) {
    client.logger.fatal(e)
    client.destroy()
    process.exit(1)
}