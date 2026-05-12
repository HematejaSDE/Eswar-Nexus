const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'model', 'system'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  contextData: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
