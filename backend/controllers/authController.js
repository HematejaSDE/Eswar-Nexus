const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper: sign JWT and return response
const signTokenAndRespond = (user, res) => {
  const payload = { user: { id: user.id, role: user.role } };
  jwt.sign(
    payload,
    process.env.JWT_SECRET || 'fallback_secret',
    { expiresIn: '5h' },
    (err, token) => {
      if (err) throw err;
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
    }
  );
};

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'student'
    });

    await user.save();
    signTokenAndRespond(user, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Google-only account trying to use password login
    if (!user.password) {
      return res.status(400).json({ message: 'This account uses Google Sign-In. Please continue with Google.' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    signTokenAndRespond(user, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Google OAuth Login / Register
exports.googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ message: 'Google credential is required' });
    }

    // Verify the Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { sub: googleId, email, name, picture } = ticket.getPayload();

    // Find existing user by googleId or email
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (user) {
      // Update googleId and avatar if signing in via Google for the first time
      if (!user.googleId) {
        user.googleId = googleId;
        user.avatar = picture;
        await user.save();
      }
    } else {
      // Create new user from Google profile
      user = new User({
        name,
        email,
        googleId,
        avatar: picture,
        role: 'student',
      });
      await user.save();
    }

    signTokenAndRespond(user, res);
  } catch (err) {
    console.error('Google Auth Error:', err.message);
    res.status(401).json({ message: 'Google authentication failed. Please try again.' });
  }
};

// Google OAuth via access-token + userinfo profile (useGoogleLogin hook flow)
exports.googleTokenAuth = async (req, res) => {
  try {
    const { googleId, email, name, avatar } = req.body;

    if (!googleId || !email) {
      return res.status(400).json({ message: 'Google profile data is required' });
    }

    // Find existing user by googleId or email
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (user) {
      // Link Google account if the user previously signed up with email
      if (!user.googleId) {
        user.googleId = googleId;
        user.avatar = avatar;
        await user.save();
      }
    } else {
      // Create a brand-new user from Google profile
      user = new User({ name, email, googleId, avatar, role: 'student' });
      await user.save();
    }

    signTokenAndRespond(user, res);
  } catch (err) {
    console.error('Google Token Auth Error:', err.message);
    res.status(401).json({ message: 'Google authentication failed. Please try again.' });
  }
};


exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

