import { FastifyInstance } from 'fastify';
import axios from 'axios';
import redis from '../utils/redis';

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8001';

export default async function etaRoutes(fastify: FastifyInstance) {
  fastify.get('/:stop_id', async (request, reply) => {
    const { stop_id } = request.params as any;
    const bus_id = (request.query as any).bus_id || 'bus_01';

    // 1. Check Cache
    const cacheKey = `eta_cache:${stop_id}:${bus_id}`;
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    try {
      // 2. Call ML Service
      const response = await axios.get(`${ML_SERVICE_URL}/eta/${stop_id}?bus_id=${bus_id}`);
      const data = response.data;

      // 3. Cache Result (15 seconds as per docs)
      await redis.set(cacheKey, JSON.stringify(data), 'EX', 15);

      return data;
    } catch (error: any) {
      fastify.log.error(error);
      return reply.code(500).send({ error: "ML_SERVICE_ERROR", message: "Failed to fetch ETA from prediction engine" });
    }
  });
}
