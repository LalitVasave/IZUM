import { FastifyInstance } from 'fastify';
import db from '../utils/db';

export default async function stopRoutes(fastify: FastifyInstance) {
  fastify.get('/', async (request, reply) => {
    try {
      const stops = await db.stop.findMany({
        orderBy: { sequence: 'asc' }
      });
      return stops;
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: "DB_ERROR", message: "Failed to fetch stops" });
    }
  });
}
