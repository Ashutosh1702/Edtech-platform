// src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api', routes); // All API routes under /api

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});

// Error middlewares
app.use(notFound);
app.use(errorHandler);

module.exports = app;
