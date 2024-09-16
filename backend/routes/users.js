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
    if (!onlineUsers.includes(user)) {
      onlineUsers.push(user);
    }
    res.json(onlineUsers);
  } catch (error) {
    res.status(500).json({ error: 'Problem while adding user to \'onlineUsers\' variable' });
  }
});

// functions
const getOnlineUsers = () => onlineUsers;

const removeOnlineUser = (user) => {
  if (onlineUsers.includes(user)) {
    onlineUsers = onlineUsers.filter(u => u !== user);
  }
}

module.exports = {
  router,
  getOnlineUsers,
  removeOnlineUser
};