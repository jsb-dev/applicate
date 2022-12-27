// import express, and connection from config/database.js
import express from 'express';
import connection from './database/database.js';

// Initialize express app
const app = express();

// Middleware
app.use(express.json());

// Routes

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

connection.on('open', () => {
  console.log('MongoDB connection established');
});
