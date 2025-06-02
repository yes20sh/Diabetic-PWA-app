import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import reportRoutes from './routes/reportRoutes.js'
import medicineRoutes from './routes/medicineRoutes.js'


const app = express();

// Middleware
app.use(express.json()); // 🔹 Needed to parse JSON request bodies
app.use(cookieParser());

// 🔐 CORS Configuration (recommended)
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/report',reportRoutes);
app.use('/medicine', medicineRoutes);

export default app;
