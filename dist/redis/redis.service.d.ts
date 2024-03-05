import { OnModuleDestroy } from '@nestjs/common';
import { RedisClient } from './redis.client.type';
import { SetRedisValueDto } from './dto/set-redis.dto';
export declare class RedisService implements OnModuleDestroy {
    private readonly redisClient;
    constructor(redisClient: RedisClient);
    onModuleDestroy(): void;
    getClient(): Promise<RedisClient>;
    ping(): Promise<string>;
    set(setRedisValueDto: SetRedisValueDto): Promise<string>;
    get(key: string): Promise<string | null>;
    exists(key: string): Promise<boolean>;
    del(key: string): Promise<number>;
}
