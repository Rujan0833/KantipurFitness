import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';

dotenv.config();

// Connect to database
connectDB();

const app: Express = express();
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:8080', 'http://127.0.0.1:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Kantipur Fitness API is running!');
});

// Start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
}); 