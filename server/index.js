import express from 'express';
import signupRouter from './routers/signup.js';
import connection from './database/database.js';

const app = express();

app.use(express.json());
app.use('/signup', signupRouter);

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

/* Debugging

// Send the POST request after the database connection has been established
const body = {
  email: 'jacob.booth.tkd99@gmail.com',
  password: 'password',
};

request.post(
  {
    url: 'http://localhost:5000/signup',
    json: true,
    body,
  },
  (error, response, body) => {
    if (error) {
      console.error(error);
    } else {
      console.log(response.statusCode);
      console.log(body);
    }
  }
);

*/
