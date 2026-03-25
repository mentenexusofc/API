import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export class UserController {
  async register(req: Request, res: Response) {
    const { clinicId, name, email, password, role } = req.body;

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) return res.status(400).json({ error: 'User already exists' });

    const passwordHash = await bcrypt.hash(password, 8);

    const user = await prisma.user.create({
      data: {
        clinicId,
        name,
        email,
        password: passwordHash,
        role
      }
    });

    return res.status(201).json({ id: user.id, name: user.name, email: user.email });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, clinicId: user.clinicId, role: user.role }, JWT_SECRET, {
      expiresIn: '7d'
    });

    return res.json({
      user: { id: user.id, name: user.name, email: user.email, clinicId: user.clinicId },
      token
    });
  }
}
