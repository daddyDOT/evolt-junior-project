const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('(backend) A user connected:', socket.id);

  socket.on('message', (data) => {
    console.log('(backend) Message received:', data);
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('(backend) User disconnected:', socket.id);
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
