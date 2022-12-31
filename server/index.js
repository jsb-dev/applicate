import express from 'express';
import connection from './database/database.js';
import dotenv from 'dotenv';
import signupRouter from './routers/signup.js';
import loginRouter from './routers/login.js';
import logoutRouter from './routers/logout.js';

const app = express();

dotenv.config();

app.use(express.json());
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

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
