import { Router } from 'express';
import { ClinicController } from '../controllers/ClinicController';
import { ProfessionalController } from '../controllers/ProfessionalController';
import { PatientController } from '../controllers/PatientController';
import { AppointmentController } from '../controllers/AppointmentController';
import { UserController } from '../controllers/UserController';

const routes = Router();

const clinicController = new ClinicController();
const professionalController = new ProfessionalController();
const patientController = new PatientController();
const appointmentController = new AppointmentController();
const userController = new UserController();

// Auth
routes.post('/register', userController.register);
routes.post('/login', userController.login);

// Clinics
routes.post('/clinics', clinicController.create);
routes.get('/clinics', clinicController.list);
routes.get('/clinics/:id', clinicController.show);

// Professionals (Doctors)
routes.post('/professionals', professionalController.create);
routes.get('/professionals/clinic/:clinicId', professionalController.listByClinic);
routes.put('/professionals/:id', professionalController.update);

// Patients (Clients)
routes.post('/patients', patientController.create);
routes.get('/patients/clinic/:clinicId', patientController.listByClinic);
routes.put('/patients/:id', patientController.update);

// Appointments (Schedules)
routes.post('/appointments', appointmentController.create);
routes.get('/appointments/doctor/:doctorId', appointmentController.listByDoctor);
routes.patch('/appointments/:id/status', appointmentController.updateStatus);

export default routes;
