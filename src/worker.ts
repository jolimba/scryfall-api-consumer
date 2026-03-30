import { Worker } from 'bullmq';
import IORedis from 'ioredis';

const redisPython = new IORedis({
  host: 'redis-python-host',
  port: 6379
});

new Worker('mtg', async job => {
    if (job.name !== 'mtg-fetch') return;
    const { requestId } = job.data;
    let result = null;
    for (let i = 0; i < 20; i++) {
        const data = await redisPython.get(requestId);
        if (data) {
            result = JSON.parse(data);
            break;
        }
        await new Promise(r => setTimeout(r, 200)); // 200ms
    }
    if (!result) {
        throw new Error('timeout waiting python result');
    }
    return result; // <- vai pro controller
});