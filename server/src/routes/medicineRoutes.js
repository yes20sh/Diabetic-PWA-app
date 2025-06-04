import express from 'express';
import {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
} from '../controllers/medicineController.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();

// All medicine routes require authentication via JWT token
router.use(verifyToken);

// Create a new medicine
router.post('/create', createMedicine);

// Get all medicines
router.get('/all', getAllMedicines);

// Get a medicine by ID
router.get('/:id', getMedicineById);

// Update a medicine by ID
router.put('/:id', updateMedicine);

// Delete a medicine by ID
router.delete('/:id', deleteMedicine);

export default router;
