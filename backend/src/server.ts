import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyCookie from '@fastify/cookie';
import fastifyRateLimit from '@fastify/rate-limit';
import path from 'path';
import fastifyWebsocket from '@fastify/websocket';
import authRoutes from './routes/auth';
import telemetryRoutes from './routes/telemetry';
import wsRoutes from './routes/ws';
import etaRoutes from './routes/eta';
import stopRoutes from './routes/stops';
import sosRoutes from './routes/sos';
import driverRoutes from './routes/driver';

const fastify = Fastify({ logger: true });

// Register Plugins
fastify.register(fastifyCookie);
fastify.register(fastifyWebsocket);
fastify.register(fastifyRateLimit, {
  max: 100,
  timeWindow: '1 minute'
});

// Serve Frontend HTML folders
const frontendDir = path.join(__dirname, '../../../stitch_izum_campus_mobility_platform_extracted/stitch_izum_campus_mobility_platform');
fastify.register(fastifyStatic, {
  root: frontendDir,
  prefix: '/',
});

// Register API Routes
fastify.register(authRoutes, { prefix: '/api/auth' });
fastify.register(telemetryRoutes, { prefix: '/api/internal' });
fastify.register(wsRoutes, { prefix: '/ws' });
fastify.register(etaRoutes, { prefix: '/api/eta' });
fastify.register(stopRoutes, { prefix: '/api/stops' });
fastify.register(sosRoutes, { prefix: '/api/sos' });
fastify.register(driverRoutes, { prefix: '/api/driver' });

// Frontend Route Mappings
fastify.get('/register', async (request, reply) => {
  return reply.sendFile('izum_registration/index.html');
});

fastify.get('/login', async (request, reply) => {
  return reply.sendFile('izum_login/index.html');
});

fastify.get('/map', async (request, reply) => {
  return reply.sendFile('izum_live_map_view/index.html');
});

fastify.get('/driver', async (request, reply) => {
  return reply.sendFile('izum_status_overlays/index.html'); // example mapping
});

// Start Server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    fastify.log.info(`Server listening on port 3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
