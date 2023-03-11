import { container } from '@sapphire/framework';

const start = Date.now()
container.uptime = () => Date.now() - start;

declare module '@sapphire/pieces' {
    export interface Container {
        uptime: () => number;
    }
}