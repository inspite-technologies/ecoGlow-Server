import express from 'express';
import upload from '../config/multer.js'
import { createServicesSection, updateServicesSection, getServicesSection } from '../controllers/servicesController.js';
import protectAdmin from './middleWare/adminMiddleWare.js';

const app = express.Router();

app.get('/', getServicesSection);

app.post('/', upload.any(),protectAdmin, createServicesSection);
app.put('/', upload.any(),protectAdmin, updateServicesSection);

export default app;