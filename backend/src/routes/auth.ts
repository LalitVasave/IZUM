import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import prisma from '../utils/db';
import redis from '../utils/redis';
import { signAccessToken, signRefreshToken, verifyToken } from '../utils/jwt';

const RegisterSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  role: z.enum(["student", "driver", "admin"]),
  college_id: z.string().optional(),
  license_no: z.string().optional(),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/register', async (request, reply) => {
    const data = RegisterSchema.parse(request.body);
    
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      return reply.code(409).send({ error: "EMAIL_TAKEN", message: "This email is already registered" });
    }

    const hashed_password = await bcrypt.hash(data.password, 12);

    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: data.email,
          hashed_password,
          role: data.role,
        }
      });

      if (data.role === 'student') {
        const college_id_hash = data.college_id ? crypto.createHash('sha256').update(data.college_id).digest('hex') : null;
        await tx.student.create({
          data: {
            user_id: newUser.id,
            name: data.name,
            college_id_hash,
          }
        });
      } else if (data.role === 'driver') {
        await tx.driver.create({
          data: {
            user_id: newUser.id,
            license_no: data.license_no,
          }
        });
      }

      return newUser;
    });

    const jti = crypto.randomUUID();
    const access_token = await signAccessToken({ id: user.id, email: user.email, role: user.role });
    const refresh_token = await signRefreshToken({ id: user.id }, jti);

    await prisma.refreshToken.create({
      data: {
        jti,
        user_id: user.id,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });

    await redis.set(`refresh:${jti}`, user.id, 'EX', 7 * 24 * 60 * 60);

    reply.setCookie('refresh_token', refresh_token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
    });

    return reply.code(201).send({
      access_token,
      token_type: "bearer",
      user: { id: user.id, email: user.email, role: user.role }
    });
  });

  fastify.post('/login', async (request, reply) => {
    const data = LoginSchema.parse(request.body);
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      return reply.code(401).send({ error: "INVALID_CREDENTIALS" });
    }

    const isValid = await bcrypt.compare(data.password, user.hashed_password);
    if (!isValid) {
      return reply.code(401).send({ error: "INVALID_CREDENTIALS" });
    }

    const jti = crypto.randomUUID();
    const access_token = await signAccessToken({ id: user.id, email: user.email, role: user.role });
    const refresh_token = await signRefreshToken({ id: user.id }, jti);

    await prisma.refreshToken.create({
      data: { jti, user_id: user.id, expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
    });
    
    await redis.set(`session:${jti}`, user.id, 'EX', 900);
    await redis.set(`refresh:${jti}`, user.id, 'EX', 7 * 24 * 60 * 60);

    reply.setCookie('refresh_token', refresh_token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
    });

    return reply.code(200).send({
      access_token,
      token_type: "bearer",
      user: { id: user.id, email: user.email, role: user.role }
    });
  });

  fastify.post('/refresh', async (request, reply) => {
    const token = request.cookies.refresh_token;
    if (!token) return reply.code(401).send({ error: "NO_TOKEN" });

    try {
      const payload = await verifyToken(token);
      const jti = payload.jti as string;
      const user_id = payload.id as string;

      const stored = await redis.get(`refresh:${jti}`);
      if (!stored) return reply.code(401).send({ error: "INVALID_TOKEN" });

      const user = await prisma.user.findUnique({ where: { id: user_id } });
      if (!user) return reply.code(401).send({ error: "USER_NOT_FOUND" });

      const access_token = await signAccessToken({ id: user.id, email: user.email, role: user.role });
      
      const newJti = crypto.randomUUID();
      await redis.set(`session:${newJti}`, user.id, 'EX', 900);

      return reply.send({ access_token });
    } catch (err) {
      return reply.code(401).send({ error: "INVALID_TOKEN" });
    }
  });

  fastify.post('/logout', async (request, reply) => {
    const token = request.cookies.refresh_token;
    if (token) {
      try {
        const payload = await verifyToken(token);
        const jti = payload.jti as string;
        await redis.del(`refresh:${jti}`);
        await prisma.refreshToken.updateMany({
          where: { jti },
          data: { revoked: true }
        });
      } catch (err) {}
    }

    reply.clearCookie('refresh_token');
    return reply.send({ success: true });
  });

  fastify.get('/me', async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.code(401).send({ error: "UNAUTHORIZED" });
    }

    const token = authHeader.split(' ')[1];
    try {
      const payload = await verifyToken(token);
      const user = await prisma.user.findUnique({
        where: { id: payload.id as string },
        select: { id: true, email: true, role: true, student: true, driver: true }
      });
      if (!user) return reply.code(401).send({ error: "UNAUTHORIZED" });
      
      return reply.send({ user });
    } catch (err) {
      return reply.code(401).send({ error: "UNAUTHORIZED" });
    }
  });
}
