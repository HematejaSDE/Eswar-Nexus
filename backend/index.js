const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Route imports
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection — tries Atlas first, falls back to local MongoDB
const connectDB = async () => {
  const atlasUri = process.env.MONGO_URI;
  const localUri = 'mongodb://127.0.0.1:27017/eswar_nexus';

  try {
    const conn = await mongoose.connect(atlasUri, { serverSelectionTimeoutMS: 5000 });
    console.log(`MongoDB Connected (Atlas): ${conn.connection.host}`);
  } catch (atlasError) {
    console.warn(`MongoDB Atlas unreachable: ${atlasError.message}`);
    console.log('Falling back to local MongoDB...');
    try {
      const conn = await mongoose.connect(localUri);
      console.log(`MongoDB Connected (Local): ${conn.connection.host}`);
    } catch (localError) {
      console.error(`Local MongoDB also failed: ${localError.message}. Running without DB.`);
    }
  }
};
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Eswar Nexus API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
