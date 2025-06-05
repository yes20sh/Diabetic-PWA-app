import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import medicineRoutes from './routes/medicineRoutes.js';
import dashboardRoute from './routes/dashboardRoutes.js';
import userRoutes from './routes/userRoutes.js';
import passwordRoutes from './routes/passwordRoutes.js';

const app = express();

// Trust proxy if deploying behind a proxy (e.g., Render, Heroku, etc.)
app.set('trust proxy', 1); // Important for correct cookie handling behind proxies

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Configuration for cross-site cookies
app.use(cors({
  origin: 'https://sweet-track.onrender.com', // Frontend origin
  credentials: true, // Allow cookies to be sent/received
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/report', reportRoutes);
app.use('/medicine', medicineRoutes);
app.use('/api/charts', dashboardRoute);
app.use('/api/users', userRoutes);
app.use('/api/auth', passwordRoutes);

export default app;
