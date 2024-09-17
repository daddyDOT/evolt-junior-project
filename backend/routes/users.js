const express = require('express');
const router = express.Router();

let onlineUsers = [];

router.get('/', (req, res) => {
  try {
    res.json(onlineUsers);
  } catch (error) {
    res.status(500).json({ error: 'Problem while loading \'onlineUsers\' variable' });
  }
});

router.put('/', (req, res) => {
  try {
    const { user } = req.body;
    addUserToOnlineUsers(user);
    res.json(onlineUsers);
  } catch (error) {
    res.status(500).json({ error: 'Problem while adding user to \'onlineUsers\' variable' });
  }
});

// functions
const getOnlineUsers = () => onlineUsers;

const isUserOnline = (socketId) => {
  return onlineUsers.some(user => user.socketId === socketId);
};

const addUserToOnlineUsers = (user) => {
  if (!onlineUsers.includes(user)) {
    onlineUsers.push(user);
  }

  return onlineUsers;
};

const removeOnlineUser = (socketId) => {
  onlineUsers = onlineUsers.filter(u => u.socketId !== socketId);

  return onlineUsers;
}

module.exports = {
  router,
  getOnlineUsers,
  isUserOnline,
  addUserToOnlineUsers,
  removeOnlineUser
};