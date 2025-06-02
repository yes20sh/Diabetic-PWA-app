import express from 'express';
import { createReport, getReports, updateReport } from '../controllers/reportController.js';

const router = express.Router();

// Create a new report
router.post('/create', createReport);

// Get all reports
router.get('/report', getReports);

// Update a report by ID
router.put('/:id', updateReport);

export default router;
