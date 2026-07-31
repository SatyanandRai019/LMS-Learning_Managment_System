import { config } from 'dotenv';
config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import paymentRoutes from './routes/payment.routes.js'
import errorMiddleware from './middlewares/error.middleware.js';
import adminRoutes from "./routes/admin.routes.js";


const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

console.log("FRONTEND_URL =", process.env.FRONTEND_URL);

app.use(cookieParser());
app.use(morgan('dev'));

app.use('/ping', (req, res) => {
    res.send('/pong');
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use((req, res) => {
    res.status(404).send('Route not found');
});

app.use(errorMiddleware);

export default app;