const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const Message = require('./models/messageModel');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoDB = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// endpoints
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
})

// socket.io
io.on('connection', (socket) => {
  console.log('(backend) A user connected:', socket.id);

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
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
