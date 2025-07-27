const express = require('express');
const Logger = require('./utils/logger');
const corsMiddleware = require('./middlewares/cors.middleware');
const ResponseHelper = require('./utils/response.helper');
require('dotenv').config();

const app = express();

// Middleware de logging de requests
app.use((req, res, next) => {
  Logger.request(req);
  next();
});

// Configuración de CORS
app.use(corsMiddleware);

// Parseo de JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api', require('./routes/user.routes'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Dealora Backend funcionando correctamente',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta no encontrada
app.use((req, res) => {
  ResponseHelper.notFound(res, `Ruta ${req.method} ${req.originalUrl} no encontrada`);
});

// Manejo global de errores
app.use((error, req, res, next) => {
  Logger.error('Error no manejado:', error);
  const message = process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor';
  ResponseHelper.error(res, message);
});

// 👈 ¡Este export es lo que necesita server.js!
module.exports = app;