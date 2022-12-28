import express from 'express';
import connection from './database/database.js';
import signupRouter from './routers/signup.js';
import request from 'request';

// Initialize express app
const app = express();

// Middleware
app.use('/signup', signupRouter);
app.use(express.json());
console.log('Middleware initialised');

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

connection.on('open', () => {
  console.log('MongoDB connection established');
});

// debug
async function runPostRequest() {
  // Wait for the database connection to be established
  await new Promise((resolve, reject) => {
    connection.on('open', resolve);
    connection.on('error', reject);
  });

  console.log('Running request post.....');

  // Now that the database connection is established, you can send the POST request
  const response = await new Promise((resolve, reject) => {
    console.log('Request post starts');

    request.post(
      {
        url: 'http://localhost:5000/signup',
        json: true,
        body: {
          email: 'test@example.com',
          password: 'password',
        },
      },
      (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve({ response, body });
        }
      }
    );
  });
  console.log(response.body);
  console.log('Post body should appear before this line');
  console.log('Request post ends');
}

// Call the function to send the POST request
runPostRequest();
