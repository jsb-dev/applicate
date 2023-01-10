import express from 'express';
import connection from './database/database.js';
import cors from 'cors';
import dotenv from 'dotenv';
import accountRouter from './routers/account.js';
import documentRouter from './routers/document.js';
import checkAuthRouter from './routers/auth.js';
import apiRouter from './routers/api.js';
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/account', accountRouter);
app.use('/auth', checkAuthRouter);
app.use('/document', documentRouter);
app.use('/api', apiRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

async function testDatabaseConnection() {
  await new Promise((resolve, reject) => {
    connection.on('open', resolve);
    connection.on('error', reject);
  });

  console.log('Database connection established');
}

testDatabaseConnection();
