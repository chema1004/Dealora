const express = require('express');
const Logger = require('./utils/logger');
const corsMiddleware = require('./middlewares/cors.middleware');
const ResponseHelper = require('./utils/response.helper');
// Middleware de logging para requests
require('dotenv').config();
  Logger.request(req);
  next();
});

// Configuración de CORS
app.use(corsMiddleware);

app.use(express.json()); // Necesario para leer JSON en el body
app.use(express.urlencoded({ extended: true })); // Para formularios

// Rutas de autenticación
app.use('/api/auth', require('./routes/auth.routes'));

// Rutas de usuarios
app.use('/api', require('./routes/user.routes'));

// Ruta de health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Dealora Backend funcionando correctamente',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  ResponseHelper.notFound(res, `Ruta ${req.method} ${req.originalUrl} no encontrada`);
});

// Middleware de manejo de errores
app.use((error, req, res, next) => {
  Logger.error('Error no manejado:', error);
  
  const message = process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor';
  ResponseHelper.error(res, message);
});

module.exports = app;