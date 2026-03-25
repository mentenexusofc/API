import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PatientController {
  async create(req: Request, res: Response) {
    const { clinicId, name, phone, email, birthDate } = req.body;
    const patient = await prisma.patient.create({
      data: {
        clinicId,
        name,
        phone,
        email,
        birthDate: birthDate ? new Date(birthDate) : undefined
      }
    });

    return res.status(201).json(patient);
  }

  async listByClinic(req: Request, res: Response) {
    const { clinicId } = req.params;
    const patients = await prisma.patient.findMany({
      where: { clinicId }
    });
    return res.json(patients);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, phone, email, birthDate } = req.body;

    const patient = await prisma.patient.update({
      where: { id },
      data: {
        name,
        phone,
        email,
        birthDate: birthDate ? new Date(birthDate) : undefined
      }
    });

    return res.json(patient);
  }
}
