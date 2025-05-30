import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';

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

export default app;
