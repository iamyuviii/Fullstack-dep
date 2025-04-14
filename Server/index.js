const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authroutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true // Allow sending cookies and other credentials
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Ensure MONGO_URL is defined
if (!process.env.MONGO_URL) {
  console.error('MONGO_URL environment variable not defined');
  process.exit(1);
}

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  
})
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err.message));


// Routes
app.use('/', authRoutes);

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
