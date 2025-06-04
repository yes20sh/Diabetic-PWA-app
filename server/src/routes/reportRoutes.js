import express from 'express';
import {
  createReport,
  getReports,
  getReportById,
  updateReport,
} from '../controllers/reportController.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create a new report (authenticated)
router.post('/create', verifyToken, createReport);

// Get all reports (authenticated)
router.get('/report', verifyToken, getReports);

// Get a single report by ID (authenticated)
router.get('/:id', verifyToken, getReportById);

// Update a report by ID (authenticated)
router.put('/:id', verifyToken, updateReport);

export default router;
