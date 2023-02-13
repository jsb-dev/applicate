import express from 'express';
import connection from './database/database.js';
import dotenv from 'dotenv';
import sendEmail from './utils/mailer.js';
import cors from 'cors';
import { Server } from 'socket.io';
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
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  socket.on('setup', (userId) => {
    socket.join(userId);
  });

  socket.on('access document', (room) => {
    socket.join(room);
  });

  socket.on('document update', (docId, json) => {
    socket.to(docId).emit('update broadcast', json);
  });

  socket.on('update position', (docId, userEmail, cursorColor, cursorPos) => {
    user.cursorPos = cursorPos;
    socket.to(docId).emit('position cursor', userEmail, cursorColor, cursorPos);
  });
});
