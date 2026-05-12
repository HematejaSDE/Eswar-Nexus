const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const auth = require('../middleware/authMiddleware');

// @route   POST /api/chat
// @desc    Send a message to Eswar AI
// @access  Private
router.post('/', auth, aiController.sendMessage);

// @route   GET /api/chat/conversations
// @desc    Get all conversations for user
// @access  Private
router.get('/conversations', auth, aiController.getConversations);

// @route   GET /api/chat/:id
// @desc    Get messages for a conversation
// @access  Private
router.get('/:id', auth, aiController.getMessages);

module.exports = router;
