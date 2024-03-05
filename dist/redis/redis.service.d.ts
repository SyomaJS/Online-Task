import { OnModuleDestroy } from '@nestjs/common';
import { RedisClient } from './redis.client.type';
export declare class RedisService implements OnModuleDestroy {
    private readonly redisClient;
    constructor(redisClient: RedisClient);
    onModuleDestroy(): void;
    ping(): Promise<string>;
}
