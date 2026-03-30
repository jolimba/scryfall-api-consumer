import Redis, { RedisOptions } from 'ioredis';

export const redisConfig: RedisOptions = {
  host: 'redis',
  port: 6379,
};

export const redis = new Redis(redisConfig);