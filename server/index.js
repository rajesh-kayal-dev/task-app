import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDB");
})
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

// Middleware to handel cors
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5174',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Middleware to handel JSON object in request body
app.use(express.json());

app.listen(process.env.PORT || 4000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/auth', authRoutes);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ 
    success: false,
    statusCode: statusCode,
    message
   });
  })