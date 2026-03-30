import { Queue, QueueEvents } from 'bullmq';
import { redisConfig } from '../data/Redis.client';

export const mtgQueue = new Queue('mtg', { connection: redisConfig });
export const mtgQueueEvents = new QueueEvents('mtg', { connection: redisConfig });