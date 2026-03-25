import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ClinicController {
  async create(req: Request, res: Response) {
    const { name, phone, email, address, logoUrl } = req.body;
    const clinic = await prisma.clinic.create({
      data: { name, phone, email, address, logoUrl }
    });
    return res.status(201).json(clinic);
  }

  async list(req: Request, res: Response) {
    const clinics = await prisma.clinic.findMany();
    return res.json(clinics);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const clinic = await prisma.clinic.findUnique({
      where: { id },
      include: {
        doctors: true,
        patients: true
      }
    });
    if (!clinic) return res.status(404).json({ error: 'Clinic not found' });
    return res.json(clinic);
  }
}
