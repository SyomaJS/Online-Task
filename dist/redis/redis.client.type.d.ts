import { createClient } from 'redis';
export type RedisClient = ReturnType<typeof createClient>;
export declare const REDIS_CLIENT: unique symbol;
