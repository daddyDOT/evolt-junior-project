const express = require('express');
const Message = require('../models/messageModel');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const messages = await Message.find();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching messages' });
    }
});

module.exports = router;