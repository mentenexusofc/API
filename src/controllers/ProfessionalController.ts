import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProfessionalController {
  async create(req: Request, res: Response) {
    const { clinicId, name, specialty, platformLogin, platformPassword, phone } = req.body;
    
    // Check if clinic exists
    const clinic = await prisma.clinic.findUnique({ where: { id: clinicId } });
    if (!clinic) return res.status(404).json({ error: 'Clinic not found' });

    const professional = await prisma.doctor.create({
      data: {
        clinicId,
        name,
        specialty,
        platformLogin,
        platformPassword,
        phone
      }
    });

    return res.status(201).json(professional);
  }

  async listByClinic(req: Request, res: Response) {
    const { clinicId } = req.params;
    const professionals = await prisma.doctor.findMany({
      where: { clinicId }
    });
    return res.json(professionals);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, specialty, platformLogin, platformPassword, phone, active } = req.body;

    const professional = await prisma.doctor.update({
      where: { id },
      data: { name, specialty, platformLogin, platformPassword, phone, active }
    });

    return res.json(professional);
  }
}
