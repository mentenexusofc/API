import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AppointmentController {
  async create(req: Request, res: Response) {
    const { clinicId, doctorId, patientId, scheduledAt, notes } = req.body;
    
    // Check if appointment is at a valid time
    // You could add logic here for preventing double bookings

    const appointment = await prisma.appointment.create({
      data: {
        clinicId,
        doctorId,
        patientId,
        scheduledAt: new Date(scheduledAt),
        notes,
        status: 'PENDING'
      }
    });

    return res.status(201).json(appointment);
  }

  async listByDoctor(req: Request, res: Response) {
    const { doctorId } = req.params;
    const { date } = req.query; // Optional filter

    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        scheduledAt: date ? {
            gte: new Date(date as string),
            lt: new Date(new Date(date as string).getTime() + 24 * 60 * 60 * 1000)
        } : undefined
      },
      include: {
        patient: true,
        doctor: true
      }
    });

    return res.json(appointments);
  }

  async updateStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status }
    });

    return res.json(appointment);
  }
}
