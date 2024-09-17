const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const messagesRouter = require('./routes/messages');
const users = require('./utils/users');
const Message = require('./models/messageModel');

require('dotenv').config();

const app = express();
const mongoDB = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database
mongoose.set("strictQuery", false);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
  
// socket.io
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// routers
app.use('/messages', messagesRouter);

io.on('connection', (socket) => {

  console.log('(backend) User connected with Socket ID:', socket.id);

  socket.on('join', ({ name, room }, callback) => {
    console.log(name, room);
  });

  // generate random user info
  const user = {
    username: `User${Math.floor(Math.random() * 1000)}`,
    avatar: `https://api.dicebear.com/9.x/thumbs/svg?seed=${Math.floor(Math.random() * 1000)}`,
    socketId: socket.id
  }

  // add user to the list of online users
  const onlineUsers = users.add({ ...user, socketId: socket.id });

  // send user info to the client
  socket.emit('send-socket-id', { user, onlineUsers });
  
  // using broadcast to inform all other users
  socket.broadcast.emit('user-connected', { user, onlineUsers });

  socket.on('message', async (data) => {
    const newMessage = new Message({...data})

    let newId = undefined;

    try {
      const savedMessage = await newMessage.save();
      newId = savedMessage._id;
    } catch (error) {
      console.error('(backend) Error saving message:', error);
    }

    io.emit('message', {message: data.message, _id: newId, user: data.user});
  });

  socket.on('disconnect', () => {
    console.log('(backend) User disconnected:', socket.id);
    const online = users.remove(socket.id);

    // send user info to the client
    socket.broadcast.emit('remove-socket-id', { onlineUsers: online });
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
