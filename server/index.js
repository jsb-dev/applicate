import express from 'express';
import connection from './database/database.js';
import cors from 'cors';
import dotenv from 'dotenv';
import signupRouter from './routers/signup.js';
import googleSignupRouter from './routers/googleSignup.js';
import loginRouter from './routers/login.js';
import logoutRouter from './routers/logout.js';

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use('/auth/google/callback', googleSignupRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

dotenv.config();

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
