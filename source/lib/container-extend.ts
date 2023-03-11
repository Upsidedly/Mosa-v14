import { container } from '@sapphire/framework';

const upDate = Date.now()

const uptime = () => Date.now() - upDate

container.uptime = uptime;

declare module '@sapphire/framework' {
    export interface Container {
        uptime: () => number;
    }
}