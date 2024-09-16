const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
  message: { type: String, required: true }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;