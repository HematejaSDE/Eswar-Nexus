const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

// @route   POST /api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', authController.register);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', authController.login);

// @route   POST /api/auth/google
// @desc    Google OAuth via ID token (credential flow)
// @access  Public
router.post('/google', authController.googleAuth);

// @route   POST /api/auth/google-token
// @desc    Google OAuth via access-token + userinfo profile
// @access  Public
router.post('/google-token', authController.googleTokenAuth);

// @route   GET /api/auth/me
// @desc    Get logged in user
// @access  Private
router.get('/me', auth, authController.getMe);

module.exports = router;

