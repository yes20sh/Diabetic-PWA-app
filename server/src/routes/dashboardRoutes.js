import express from 'express';
import { getDashboardGlucoseData } from '../controllers/dashboardController.js';
import verifyToken from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.get('/glucose', getDashboardGlucoseData);

export default router;
