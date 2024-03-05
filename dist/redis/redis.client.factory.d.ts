import { FactoryProvider } from '@nestjs/common';
import { RedisClient } from './redis.client.type';
export declare const redisClientFactory: FactoryProvider<Promise<RedisClient>>;
