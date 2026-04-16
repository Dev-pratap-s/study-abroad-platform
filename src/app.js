const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(morgan('dev')); // Log HTTP requests

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/universities', require('./routes/universityRoutes'));
app.use('/api/programs', require('./routes/programRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/recommendations', require('./routes/recommendationRoutes'));

// Basic health check route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Study Abroad Platform API' });
});

// Centralized error handling middleware
app.use(errorHandler);

module.exports = app;
