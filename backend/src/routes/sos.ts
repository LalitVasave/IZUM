import { FastifyInstance } from 'fastify';
import db from '../utils/db';
import { z } from 'zod';

const SOSSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  bus_id: z.string().optional(),
});

export default async function sosRoutes(fastify: FastifyInstance) {
  fastify.post('/', async (request, reply) => {
    // Authenticate (get student_id from JWT)
    // For now, using a dummy student_id
    const student_id_hash = "dummy_hash"; 

    try {
      const data = SOSSchema.parse(request.body);
      
      const event = await db.sosEvent.create({
        data: {
          student_id_hash,
          bus_id: data.bus_id, // This might need UUID validation if connected to real Bus table
          lat: data.lat,
          lng: data.lng,
          status: 'PENDING'
        }
      });

      fastify.log.warn(`SOS ALERT TRIGGERED: ${event.id} at ${data.lat}, ${data.lng}`);
      
      // In production, trigger Resend/Twilio/Push notifications here
      
      return { success: true, event_id: event.id };
    } catch (err) {
      fastify.log.error(err);
      return reply.code(400).send({ error: "SOS_FAILED" });
    }
  });
}
