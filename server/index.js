import express from 'express';
import connection from './database/database.js';
import cors from 'cors';
import dotenv from 'dotenv';
import signupRouter from './routers/signup.js';
import loginRouter from './routers/login.js';
import logoutRouter from './routers/logout.js';
import dashboardRouter from './routers/dashboard.js';
import createRouter from './routers/create.js';
import loadRouter from './routers/load.js';
import saveRouter from './routers/save.js';
import passport from 'passport';

dotenv.config();

const app = express();

// Configure the passport middleware
app.use(passport.initialize());

// Configure the express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use(
  '/dashboard',
  cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Authorization'],
  }),
  dashboardRouter
);
app.use('/create', createRouter);
app.use('/load', loadRouter);
app.use('/save', saveRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Define a function to test the database connection
async function testDatabaseConnection() {
  // Wait for the connection to be established
  await new Promise((resolve, reject) => {
    connection.on('open', resolve);
    connection.on('error', reject);
  });

  console.log('Database connection established');
}

// Call the function to test the database connection
testDatabaseConnection();
