import express from 'express';
import connection from './database/database.js';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io';
import accountRouter from './api/routers/account.js';
import documentRouter from './api/routers/document.js';
import checkAuthRouter from './api/routers/auth.js';
import utilRouter from './api/routers/utils.js';
import contactRouter from './api/routers/contact.js';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/account', accountRouter);
app.use('/auth', checkAuthRouter);
app.use('/document', documentRouter);
app.use('/utils', utilRouter);
app.use('/contact', contactRouter);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

io.on('connection', (socket) => {
  socket.on('setup', (userId) => {
    socket.join(userId);
  });

  socket.on('access document', (docId) => {
    socket.join(docId);
  });

  socket.on('document update', (docId, json) => {
    socket.to(docId).emit('update broadcast', json);
  });

  socket.on('update position', (docId, userEmail, cursorColor, cursorPos) => {
    user.cursorPos = cursorPos;
    socket.to(docId).emit('position cursor', userEmail, cursorColor, cursorPos);
  });
});
