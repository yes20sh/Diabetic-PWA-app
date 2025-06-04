import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import reportRoutes from './routes/reportRoutes.js'
import medicineRoutes from './routes/medicineRoutes.js'
import dashboardRoute from './routes/dashboardRoutes.js';
import userRoutes from './routes/userRoutes.js';
import passwordRoutes from './routes/passwordRoutes.js';


const app = express();

// Middleware
app.use(express.json()); // 🔹 Needed to parse JSON request bodies
app.use(cookieParser());

// 🔐 CORS Configuration (recommended)
app.use(cors());
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
//   credentials: true,
// }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/report',reportRoutes);
app.use('/medicine', medicineRoutes);
app.use('/api/charts', dashboardRoute);
app.use('/api/users', userRoutes);
app.use('/api/auth', passwordRoutes);

export default app;
