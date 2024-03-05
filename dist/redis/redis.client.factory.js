"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClientFactory = void 0;
const redis_1 = require("redis");
const redis_client_type_1 = require("./redis.client.type");
exports.redisClientFactory = {
    provide: redis_client_type_1.REDIS_CLIENT,
    useFactory: async () => {
        const client = (0, redis_1.createClient)({ url: 'redis://localhost:6379/0' });
        await client.connect();
        return client;
    },
};
//# sourceMappingURL=redis.client.factory.js.map