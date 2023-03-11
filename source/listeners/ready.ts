import { Listener } from '@sapphire/framework';
import pc from 'picocolors'
import type { Client } from 'discord.js';

export class ReadyListener extends Listener {
    public run(client: Client) {
        const { username, id } = client.user!;
        this.container.logger.info(`${pc.green('✓')} Successfully logged in as ${pc.green(username)} (${pc.gray(id)})`);
    }
}